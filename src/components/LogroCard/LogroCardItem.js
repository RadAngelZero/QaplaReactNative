// josep.sanahuja - 19-09-2019 - us114 - File creation

import React, { Component } from 'react';

import LogroQapla from './LogroQapla';
import LogroSocial from './LogroSocial';
import LogroVerification from './LogroVerification/LogroVerification';


class LogroCardItem extends Component {
    render() {
        let res = null;
        const {tipoLogro} = this.props;

        if (tipoLogro === 'Qaploins') {
            res = <LogroQapla {...this.props} />;
        }
        else if (tipoLogro === 'like') {
            res = <LogroSocial {...this.props} />;
        }
        else if (tipoLogro === 'verificado') {
            // TODO: Replace with VerificationLogo component
            res = <LogroVerification {...this.props} />;
        }

        return res;
    }
}

export default LogroCardItem;
