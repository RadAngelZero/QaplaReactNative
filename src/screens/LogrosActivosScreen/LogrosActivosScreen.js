// diego           - 11-12-2019 - us165 - loadQaplaLogros moved to AuthLoadingScreen
// diego           - 18-09-2019 - us110 - File creation

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';

export class LogrosActivosScreen extends Component {
    render() {
        const logros = Object.keys(this.props.logros.logrosActivos).map((logroKey) => this.props.logros.logrosActivos[logroKey]);

        return (
            <SafeAreaView style={styles.sfvContainer}>
                <LogrosList
                    isUserVerified={this.props.logros.isUserVerified}
                    logros={logros}
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
