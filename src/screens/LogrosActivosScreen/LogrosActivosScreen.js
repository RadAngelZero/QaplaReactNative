import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';
import { translate } from '../../utilities/i18';
import { getDateElementsAsNumber, getHourElementsAsNumber } from '../../utilities/utils';

export class LogrosActivosScreen extends Component {
    render() {
        const eventToDisplay = this.props.navigation.getParam('eventToDisplay', '');
        let orderedEvents = [];

        // Remove the events of previous dates
        Object.keys(this.props.logros.logrosActivos).filter((logroKey) => {
            if (this.props.logros.logrosActivos[logroKey].dateUTC && this.props.logros.logrosActivos[logroKey].hourUTC) {
                const [day, month, year] = getDateElementsAsNumber(this.props.logros.logrosActivos[logroKey].dateUTC);
                const [hour, minute] = getHourElementsAsNumber(this.props.logros.logrosActivos[logroKey].hourUTC);

                const eventDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
                const date = new Date();

                return (eventDate.getMonth() === date.getMonth() && eventDate.getDate() >= date.getDate()) ||
                (eventDate.getMonth() > date.getMonth()) &&
                eventDate.getFullYear() >= date.getFullYear();
            }

            return false;
        })
        // Create an array with the valid events
        .map((logroKey) => this.props.logros.logrosActivos[logroKey])
        // Sort the events by date
        .sort((a, b) => {
            const [aDay, aMonth, aYear] = getDateElementsAsNumber(a.dateUTC);
            const [aHour, aMinute] = getHourElementsAsNumber(a.hourUTC);
            const [bDay, bMonth, bYear] = getDateElementsAsNumber(b.dateUTC);
            const [bHour, bMinute] = getHourElementsAsNumber(b.hourUTC);

            if (a.featured) {
                return -1;
            } else if (b.featured) {
                return 1;
            }

            if (aMonth > bMonth) {
                return 1;
            }

            const aEventDate = new Date(Date.UTC(aYear, aMonth - 1, aDay, aHour, aMinute));
            const bEventDate = new Date(Date.UTC(bYear, bMonth - 1, bDay, bHour, bMinute));

            return aEventDate.getTime() - bEventDate.getTime();
        })
        // Fill orderedEvents array for the SectionList of the LogrosList component
        .forEach((logro) => {
            const [day, month, year] = getDateElementsAsNumber(logro.dateUTC);
            const [hour, minute] = getHourElementsAsNumber(logro.hourUTC);
            const today = new Date();

            if (logro.featured) {
                if (orderedEvents.some((eventsOfTheDay) => eventsOfTheDay.title === translate('LogrosActivosScreen.featuredEvent'))) {
                    orderedEvents[orderedEvents.length - 1].data.push(logro);
                } else {
                    orderedEvents.push({ title: translate('LogrosActivosScreen.featuredEvent'), data: [ logro ], indexDay: orderedEvents.length });
                }
            } else {
                const eventDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
                const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                const eventSectionTitle = today.getDate() === eventDate.getDate() ?
                    translate('days.today')
                    :
                    today.getDate() + 1 === eventDate.getDate() ?
                        translate('days.tomorrow')
                        :
                        translate(`days.${days[eventDate.getDay()]}`);

                if (orderedEvents.some((eventsOfTheDay) => eventsOfTheDay.title === eventSectionTitle)) {
                    orderedEvents[orderedEvents.length - 1].data.push(logro);
                } else {
                    orderedEvents.push({ title: eventSectionTitle, data: [ logro ], indexDay: orderedEvents.length });
                }
            }
        });

        return (
            <SafeAreaView style={styles.sfvContainer}>
                <LogrosList
                    isUserVerified={this.props.logros.isUserVerified}
                    logros={orderedEvents}
                    userId={this.props.uid}
                    eventToDisplay={eventToDisplay} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        logros: state.logrosReducer
    };
}

export default connect(mapStateToProps)(LogrosActivosScreen);
