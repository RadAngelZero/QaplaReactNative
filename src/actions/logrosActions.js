// diego           - 26-09-2019 - us130 - File creation

import { logrosActRef, logrosRef, cuentasVerificadasRef, torneosActivosRef, puntosTorneosRef } from '../services/database';
import { LOAD_USER_VERIFICATION_STATUS, LOAD_LOGROS_ACTIVOS, REMOVE_LOGRO_ACTIVO, LOAD_LOGROS_COMPLETOS } from '../utilities/Constants';

export const loadQaplaLogros = (uid) => async (dispatch) => {
    cuentasVerificadasRef.child(uid).on('value', (verifiedAccount) => {
        /**
         * That node doesn't exist unless the user requests for verification to Qapla
         * The status is 2 when the user is already verified
         * The status is 1 when the user request for verification to Qapla
         */
        if (verifiedAccount.exists() && verifiedAccount.val().status === 2) {
            dispatch(checkIfIsUserVerifiedSuccess(true));
            dispatch(removeLogroFromActivos('Verification-Logro'));
        } else {
            dispatch(loadLogrosActivosSuccess({ tipoLogro: 'verificado', id: 'Verification-Logro' }));
            dispatch(checkIfIsUserVerifiedSuccess(false));
        }
    });
    
    logrosActRef.once('value', (logrosActivos) => {
        logrosActivos.forEach((typeOfLogro) => {
            if (typeOfLogro.key !== 'verifica') {
                typeOfLogro.forEach((logroActivo) => {
                    const logroActivoObject = {
                        id: logroActivo.key,
                        ...logroActivo.val()
                    }
                    dispatch(loadLogrosActivosSuccess(logroActivoObject));
                });
            }
        });
    });

    logrosRef.child(uid).child('logroIncompleto').on('value', (logrosIncompletos) => {
        if (logrosIncompletos.exists()) {
            logrosIncompletos.forEach((logroIncompleto) => {
                const logroIncompletoObject = {
                    id: logroIncompleto.key,
                    ...logroIncompleto.val()
                };
                dispatch(loadLogrosActivosSuccess(logroIncompletoObject));
            });
        }
    });

    logrosRef.child(uid).child('logroCompleto').on('child_added', (logroCompleto) => {
        const logroCompletoObject = {
            id: logroCompleto.key,
            tipoLogro: 'completado',
            ...logroCompleto.val()
        };
        dispatch(loadLogrosCompletosSuccess(logroCompletoObject));
        dispatch(removeLogroFromActivos(logroCompleto.key));
    });

    logrosActRef.on('child_removed', (removedLogro) => {
        dispatch(removeLogroFromActivos(removedLogro.key));
    });

    torneosActivosRef.on('child_added', (torneoActivo) => {
        const torneoActivoObject = {
            id: torneoActivo.key,
            ...torneoActivo.val()
        };
        torneoActivoObject.tipoLogro = 'tournament';
        dispatch(loadLogrosActivosSuccess(torneoActivoObject));
    });

    puntosTorneosRef.child(uid).on('value', (torneosProgress) => {
        if (torneosProgress.exists()) {
            torneosProgress.forEach((torneoProgress) => {
                const torneoProgressObject = {
                    id: torneoProgress.key,
                    ...torneoProgress.val()
                };
                dispatch(loadLogrosActivosSuccess(torneoProgressObject));
            });
        }
    });

    torneosActivosRef.on('child_removed', (removedTorneo) => {
        dispatch(removeLogroFromActivos(removedTorneo.key));
    });
}

const checkIfIsUserVerifiedSuccess = (payload) => {
    return {
        type: LOAD_USER_VERIFICATION_STATUS,
        payload
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

const loadLogrosCompletosSuccess = (payload) => {
    return {
        type: LOAD_LOGROS_COMPLETOS,
        payload
    }
}