import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';
import { translate } from '../../utilities/i18';

export class LogrosActivosScreen extends Component {
    render() {
        let orderedEvents = [];

        Object.keys(this.props.logros.logrosActivos).filter((logroKey) => {
            if (this.props.logros.logrosActivos[logroKey].dateUTC) {
                const [day, month, year] = this.props.logros.logrosActivos[logroKey].dateUTC.split('-');
                const date = new Date();

                return (parseInt(month) === date.getUTCMonth() + 1 && parseInt(day) >= date.getUTCDate()) ||
                (parseInt(month) > date.getUTCMonth() + 1) &&
                parseInt(year) >= date.getUTCFullYear();
            }

            return false;
        })
        .map((logroKey) => this.props.logros.logrosActivos[logroKey])
        .sort((a, b) => {
            const [aDay, aMonth, aYear] = a.dateUTC.split('-');
            const [bDay, bMonth, bYear] = b.dateUTC.split('-');

            const aValue = parseInt(aDay) + parseInt(aMonth) + parseInt(aYear);
            const bValue = parseInt(bDay) + parseInt(bMonth) + parseInt(bYear);

            return aValue - bValue;
        })
        .forEach((logro) => {
            let [day, month, year] = logro.dateUTC.split('-');
            day = parseInt(day);
            month = parseInt(month);
            year = parseInt(year);
            let [hour, minute] = logro.hourUTC.split(':');
            hour = parseInt(hour);
            minute = parseInt(minute);
            const today = new Date();

            if (today.getUTCMonth() === month - 1) {
                const eventDate = new Date(year, month - 1, day, hour, minute);
                const days = [ "sunday", "monday", "tuesday", "wedenesday", "thursday", "friday", "saturday" ];
                const eventSectionTitle = today.getUTCDate() === day ?
                translate('days.today')
                :
                today.getUTCDate() + 1 === day ?
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
                    userId={this.props.uid}/>
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
