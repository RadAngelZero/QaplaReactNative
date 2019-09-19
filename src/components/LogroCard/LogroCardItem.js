// josep.sanahuja - 14-08-2019 - us114 - File creation

import React, { Component } from 'react';
import { View, Text} from 'react-native';

import styles from './style';
import { trackOnSegment } from '../../services/statistics';

import LogroQapla from './LogroQapla';
import LogroSocial from './LogroSocial';
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
            res = <LogroQapla {...this.props} />;
        }

        return res;
    }
}

export default LogroCardItem;

