// diego           - 18-09-2019 - us110 - File creation

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';

/**
 * Screen not used
 * @deprecated
 */
export class LogrosCompletadosScreen extends Component {
    render() {
        const logros = Object.keys(this.props.logros.logrosCompletados).map((logroKey) => this.props.logros.logrosCompletados[logroKey]);

        return (
            <SafeAreaView style={styles.sfvContainer}>
                <LogrosList
                    isUserVerified={this.props.logros.isUserVerified}
                    logros={logros} />
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

export default connect(mapStateToProps)(LogrosCompletadosScreen);
