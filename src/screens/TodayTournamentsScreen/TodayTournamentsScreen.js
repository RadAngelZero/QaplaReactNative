import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';

class TodayTournamentsScreen extends Component {
    render() {
        let logros = this.props.events.filter((event) => {
            if (event.dateUTC && event.hourUTC) {
                const date = new Date();
                const currentUTCdate = new Date(
                    Date.UTC(
                        date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()
                    )
                );

                const [eventDay, eventMonth, eventYear] = event.dateUTC.split('-');
                const [eventHour, eventMinutes] = event.hourUTC.split(':');

                /**
                 * toISOString doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
                 * toISOString returned format: YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYY-MM-DDTHH:mm:ss.sssZ
                 */
                const [UTCDate, UTCHourFormated] = currentUTCdate.toISOString().split('T');
                let [currentYear, currentMonth, currentDay] = UTCDate.split('-');

                /**
                 * Maybe this need an update on the year 9,999
                 */
                if (currentYear.includes('+') || currentYear.includes('-')) {
                    currentYear = currentYear.substring(1, currentYear.length);
                }

                const UTCHour = UTCHourFormated.split('.')[0];
                const [currentHour, currentMinutes] = UTCHour.split(':');

                /**
                 * We check if the event is today (this month, day, and year)
                 * and has not begun yet (if the hour is bigger than the current hour or if is in this hour but the minutes are bigger than the current minutes)
                 */
                return parseInt(eventMonth) === parseInt(currentMonth) &&
                    parseInt(eventDay) === parseInt(currentDay) &&
                    parseInt(eventYear) === parseInt(currentYear) &&
                    (
                        parseInt(currentHour) < parseInt(eventHour) ||
                        (parseInt(currentHour) === parseInt(eventHour) && parseInt(currentMinutes) < parseInt(eventMinutes))
                    );
            }
        });

        /**
         * If there are no events to show we send the user to the main screen
         */
        if (logros.length <= 0) {
            this.props.navigation.navigate('Achievements');
        }

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    {logros.length > 0 && 'Bienvenido de nuevo, el día de hoy tienes los siguientes eventos'}
                </Text>
                <LogrosList
                    logros={logros}
                    userId={this.props.uid} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    /**
     * We filter achievements to get only the events to which the user is subscribed
     */
    const events = Object.keys(state.logrosReducer)
        .filter((logro) => state.logrosReducer[logro] && state.logrosReducer[logro].tipoLogro === 'event' && state.logrosReducer[logro].userSubscribed)
        .map((key) => state.logrosReducer[key]);

    return {
        events,
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(TodayTournamentsScreen);
