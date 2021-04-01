// diego           - 11-12-2019 - us165 - Validate the uid before make query & empty logros added
// diego           - 14-11-2019 - us146 - Support for events added
// diego           - 26-09-2019 - us130 - File creation

import { activeEventsRef, eventParticipantsRef, activeTournamentsRef, removeActiveEventUserSubscribedListener } from '../services/database';
import { LOAD_LOGROS_ACTIVOS, REMOVE_LOGRO_ACTIVO, EMPTY_LOGROS } from '../utilities/Constants';

export const loadQaplaLogros = (uid) => async (dispatch) => {
    activeTournamentsRef.on('child_added', (activeTournament) => {
        const activeTournamentObject = {
            id: activeTournament.key,
            ...activeTournament.val()
        };
        activeTournamentObject.tipoLogro = 'tournament';
        dispatch(loadLogrosActivosSuccess(activeTournamentObject));
    });

    activeTournamentsRef.on('child_removed', (removedTournament) => {
        dispatch(removeLogroFromActivos(removedTournament.key));
    });

    const listeningEvents = [];
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0, 0, 0);
    /**
     * We load the active events
     */
    activeEventsRef.orderByChild('timestamp').startAt(date.getTime()).on('value', (activeEvents) => {
        activeEvents.forEach((activeEvent) => {
            const activeEventObject = {
                id: activeEvent.key,
                userSubscribed: false,
                ...activeEvent.val()
            };

            activeEventObject.tipoLogro = 'event';
            dispatch(loadLogrosActivosSuccess(activeEventObject));

            /**
             * Only if the uid is valid (different from null) we load the user progress in the achievements
             * To ensure that we only have one listener to the same location all the time we save the keys
             * on the listeningEvents array and we check if the event does not exists on it, if does not
             * exist then we put a listener on that event
             */
            if (uid && listeningEvents.indexOf(activeEvent.key) < 0) {
                /**
                 * Then we load the process of the current user on the given event
                 */
                eventParticipantsRef.child(activeEvent.key).child(uid).on('value', (eventProgress) => {
                    listeningEvents.push(activeEvent.key);
                    if (eventProgress.exists()) {
                        const eventProgressObject = {
                            id: activeEvent.key,
                            userSubscribed: true,
                            ...eventProgress.val()
                        };

                        dispatch(loadLogrosActivosSuccess(eventProgressObject));
                    }
                });
            } else {
                removeActiveEventUserSubscribedListener(uid, activeEvent.key);
            }
        });
    });

    /**
     * We listen for removed events
     */
    activeEventsRef.on('child_removed', (removedEvent) => {
        dispatch(removeLogroFromActivos(removedEvent.key));
    });
}

/**
 * Make the dispatch of emptyLogrosSuccess
 */
export const emptyLogros = () => (dispatch) => {
    dispatch(emptyLogrosSuccess());
}

/**
 * It tell to redux that all the "logros" information must be removed
 */
export const emptyLogrosSuccess = () => {
    return {
        type: EMPTY_LOGROS
    }
}

const loadLogrosActivosSuccess = (payload) => {
    return {
        type: LOAD_LOGROS_ACTIVOS,
        payload
    }
}

const removeLogroFromActivos = (payload) => {
    return {
        type: REMOVE_LOGRO_ACTIVO,
        payload
    }
}