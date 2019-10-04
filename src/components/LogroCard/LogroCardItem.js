// diego          - 04-10-2019 - us113 - Added LogroCompletedCard
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';

import LogroQapla from './LogroQapla';
import LogroSocial from './LogroSocial';
import LogroVerification from './LogroVerification/LogroVerification';
import LogroCompletedCard from '../LogroCompletedCard/LogroCompletedCard';

class LogroCardItem extends Component {
    render() {
        let res = null;
        const { tipoLogro } = this.props;

        switch (tipoLogro) {
            case 'Qaploins':
                res = <LogroQapla {...this.props} />;
                break;
            case 'like':
                res = <LogroSocial {...this.props} />;
                break;
            case 'verificado':
                res = <LogroVerification {...this.props} />;
                break;
            case 'completado':
                res = <LogroCompletedCard {...this.props} />;
                break;
            default:
                break;
        }

        return res;
    }
}

export default LogroCardItem;
