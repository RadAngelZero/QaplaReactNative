import React, { Component } from 'react';
import { View } from 'react-native';

import LogroQapla from './LogroQapla';
import LogroSocial from './LogroSocial';
import LogroVerification from './LogroVerification/LogroVerification';
import LogroCompletedCard from '../LogroCompletedCard/LogroCompletedCard';
import TournamentCard from '../TournamentCard/TournamentCard';
import NewEventCard from '../NewEventCard/NewEventCard';

/**
 * Container to add extra marginBottom on the last child of the list
 * (UI purpose)
 * @param {element} children Card to render into the container
 * @param {boolean} lastChild Flag to know if we need to add the margin bottom
 */
const CardContainer = ({ children, lastChild, scrolled, dynamicSeparationWidth }) => (
    <View
    style={{ marginBottom: lastChild ? (dynamicSeparationWidth || 40) * 0.75 : 0, marginRight: lastChild ? 0 : scrolled ? (dynamicSeparationWidth || 40) : ((dynamicSeparationWidth || 0)  / 2) }}
    > 
        {children}
    </View>
);

class LogroCardItem extends Component {
    render() {
        /**
         * TODO: Change all the received props from the database (in spanish) to english, then send it to the different logro
         * Also change the reference inside every logro
         */
        let res = null;
        const { tipoLogro, lastChild, scrolled, dynamicSeparationWidth } = this.props;

        switch (tipoLogro) {
            case 'Qaploins':
                res = <CardContainer lastChild={lastChild}><LogroQapla {...this.props} /></CardContainer>;
                break;
            case 'like':
                res = <CardContainer lastChild={lastChild}><LogroSocial {...this.props} /></CardContainer>;
                break;/*
            case 'verificado':
                res = <CardContainer lastChild={lastChild}><LogroVerification {...this.props} /></CardContainer>;
                break;*/
            case 'completado':
                res = <CardContainer lastChild={lastChild}><LogroCompletedCard {...this.props} /></CardContainer>;
                break;
            case 'tournament':
                res = <CardContainer lastChild={lastChild}><TournamentCard {...this.props} /></CardContainer>;
                break;
            case 'event':
                res = <CardContainer lastChild={lastChild} scrolled={scrolled} dynamicSeparationWidth={dynamicSeparationWidth}><NewEventCard {...this.props} /></CardContainer>;
                break;
            default:
                break;
        }

        return res;
    }
}

export default LogroCardItem;
