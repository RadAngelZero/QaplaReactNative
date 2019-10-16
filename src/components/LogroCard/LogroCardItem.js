// diego          - 04-10-2019 - us113 - Added LogroCompletedCard
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';
import { View } from 'react-native';

import LogroQapla from './LogroQapla';
import LogroSocial from './LogroSocial';
import LogroVerification from './LogroVerification/LogroVerification';
import LogroCompletedCard from '../LogroCompletedCard/LogroCompletedCard';
import TournamentCard from '../TournamentCard/TournamentCard';

const CardContainer = ({ children, lastChild }) => (
    <View style={{ marginBottom: lastChild ? 30 : 0 }}>
        {children}
    </View>
);

class LogroCardItem extends Component {
    render() {
        let res = null;
        const { tipoLogro, lastChild } = this.props;

        switch (tipoLogro) {
            case 'Qaploins':
                res = <CardContainer lastChild={lastChild}><LogroQapla {...this.props} /></CardContainer>;
                break;
            case 'like':
                res = <CardContainer lastChild={lastChild}><LogroSocial {...this.props} /></CardContainer>;
                break;
            case 'verificado':
                res = <CardContainer lastChild={lastChild}><LogroVerification {...this.props} /></CardContainer>;
                break;
            case 'completado':
                res = <CardContainer lastChild={lastChild}><LogroCompletedCard {...this.props} /></CardContainer>;
                break;
            case 'tournament':
                res = <CardContainer lastChild={lastChild}><TournamentCard {...this.props} /></CardContainer>;
                break;
            default:
                break;
        }

        return res;
    }
}

export default LogroCardItem;
