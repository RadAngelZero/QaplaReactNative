// diego           - 18-09-2019 - us110 - File creation

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';
import { loadQaplaLogros } from '../../actions/logrosActions';

export class LogrosActivosScreen extends Component {
    componentDidMount() {
        this.list = [
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    if (!this.props.logros.fetched) {
                        this.props.loadQaplaLogros(this.props.uid);
                    }
                }
            ),
        ];
    }

    componentWillUnmount() {
        // Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    render() {
        const logros = Object.keys(this.props.logros.logrosActivos).map((logroKey) => this.props.logros.logrosActivos[logroKey]);

        return (
            <SafeAreaView style={styles.sfvContainer}>
                <LogrosList
                    isUserVerified={this.props.logros.isUserVerified}
                    logros={logros} />
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadQaplaLogros: (uid) => loadQaplaLogros(uid)(dispatch)
    };
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        logros: state.logrosReducer
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogrosActivosScreen);
