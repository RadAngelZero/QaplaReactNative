// diego           - 11-12-2019 - us165 - loadQaplaLogros moved to AuthLoadingScreen
// diego           - 18-09-2019 - us110 - File creation

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';

export class LogrosActivosScreen extends Component {
    render() {
        let logros = Object.keys(this.props.logros.logrosActivos).filter((logroKey) => {
            if (this.props.logros.logrosActivos[logroKey].tiempoLimite) {
                const [day, month, year] = this.props.logros.logrosActivos[logroKey].tiempoLimite.split('-');
                const date = new Date();

                return parseInt(month) >= date.getMonth() + 1 && parseInt(day) >= date.getDate() && parseInt(year) >= date.getFullYear();
            }

            return false;
        })
        .map((logroKey) => this.props.logros.logrosActivos[logroKey]);

        //logros = Object.keys(logros).map((logroKey) => this.props.logros.logrosActivos[logroKey]);

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
