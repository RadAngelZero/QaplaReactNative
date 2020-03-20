import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';

class TodayTournamentsScreen extends Component {
    render() {
        let logros = this.props.events.filter((event) => {
            if (event.tiempoLimite) {
                const [eventDay, eventMonth, eventYear] = event.tiempoLimite.split('-');
                const mexicoDate = new Date().toLocaleDateString('en-us', { timeZone: 'America/Mexico_City', year: '2-digit' });
                const [month, day, year] = mexicoDate.split('/');

                const [eventHour, eventMinutes] = event.hour.split(':');
                const mexicoHour = new Date().toLocaleTimeString('en-us', { timeZone: 'America/Mexico_City', hour12: false });
                const [hour, minutes] = mexicoHour.split(':');

                /**
                 * We check if the event is today (this month, day, and year)
                 * and has not begun yet (if the hour is bigger than the current hour or if is in this hour but the minutes are bigger than the current minutes)
                 */
                return parseInt(eventMonth) === parseInt(month)
                    &&
                    parseInt(eventDay) === parseInt(day)
                    &&
                    parseInt(eventYear.substring(1, 4)) === parseInt(year)
                    &&
                    (
                        parseInt(hour) < parseInt(eventHour)
                        ||
                        (parseInt(hour) === parseInt(eventHour) && parseInt(minutes) < parseInt(eventMinutes))
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
