import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import { ONE_HOUR_MILISECONDS, HOURS_IN_DAY } from './../../../utilities/Constants';

export class LogroLifeTimeBadge extends Component {
    render() {
        const date = new Date();
        const currentUTCdate = new Date(
            Date.UTC(
                date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()
            )
        );

        /**
         * The date come from the cards in the next format:
         * Day-Month-Year
         * So we need to split between the "-" to get the data, because
         */
        const [day, month, year] = this.props.limitDate.split('-');
        const [hour, minutes] = this.props.startTime.split(':');
        const logroEndDate = new Date(`${month}/${day}/${year} ${hour}:${minutes}`);

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
