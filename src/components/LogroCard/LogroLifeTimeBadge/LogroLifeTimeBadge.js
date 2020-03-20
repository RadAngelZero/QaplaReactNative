import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import { ONE_HOUR_MILISECONDS, HOURS_IN_DAY } from './../../../utilities/Constants';

export class LogroLifeTimeBadge extends Component {
    render() {
        /**
         * The date come from the cards in the next format:
         * Day-Month-Year
         * So we need to split between the "-" to get the data, because
         * the original format is not valide to create a date object
         */
        const [day, month, year] = this.props.limitDate.split('-');
        const [hour, minutes] = this.props.hour.split(':');
        const logroEndDate = new Date(`${month}/${day}/${year} ${hour}:${minutes}`);
        const mexicoDate = new Date().toLocaleDateString('en-us', { timeZone: 'America/Mexico_City', year: '2-digit' });
        const [currentMonth, currentDay, currentYear] = mexicoDate.split('/');
        const mexicoHour = new Date().toLocaleTimeString('en-us', { timeZone: 'America/Mexico_City', hour12: false });
        const [currentHour, currentMinutes] = mexicoHour.split(':');
        const currentDate = new Date(
            `${currentMonth}/${currentDay}/${currentYear} ${currentHour}:${currentMinutes}`
        );

        let leftHours = (logroEndDate.getTime() - currentDate.getTime()) / ONE_HOUR_MILISECONDS;
        const remainingDays = Math.round(leftHours / HOURS_IN_DAY);
        const remainingHours = Math.trunc(leftHours - (remainingDays * HOURS_IN_DAY));

        let remainingMinutes = null;
        if (remainingDays === 0 && remainingHours === 0) {
            remainingMinutes = parseInt(hour) > parseInt(currentHour) ? (60 + parseInt(minutes)) - parseInt(currentMinutes) : parseInt(minutes) - parseInt(currentMinutes);
        }

        return (
            <>
                {/**
                 * If the event has not begined yet, we show this component, otherwise we return null
                 */}
                {(remainingDays > 0 || remainingHours >= 0) && (!remainingMinutes || remainingMinutes >= 0) ?
                    <View style={styles.timeLifeBadge}>
                        {remainingDays > 0 ?
                            <Text style={styles.timeLife}>
                                {`${remainingDays}d ${remainingHours > 0 ? `${remainingHours}h` : ''}`}
                            </Text>
                            :
                            remainingDays === 0 &&
                            <Text style={styles.timeLife}>
                                {`${remainingHours > 0 ? `${remainingHours}h` : remainingHours === 0 ? `${remainingMinutes}m` : ''}`}
                            </Text>
                        }
                    </View>
                    :
                    null
                }
            </>
        );
    }
}

export default LogroLifeTimeBadge;
