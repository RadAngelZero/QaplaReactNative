// diego          - 20-12-2019 - us179 - Reset countDownSecs when code is re-sended to the user
// josep.sanahuja - 18-12-2019 - us178 - File creation

import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';

import {
    VERIFICATION_COUNTDOWN_MILISECONDS,
    ONE_SECOND_IN_MILISECONDS
} from './../../utilities/Constants';

export class ResendVerCodeCountdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeResent: false,
            countFinished: false,
            countDownSecs: VERIFICATION_COUNTDOWN_MILISECONDS
        };
    }

    componentDidMount() {
        this.startCountDown();
    }

    startCountDown = () => {
        // Count down starts
        this.setState({
            countFinished: false
        });

        // Update countdown secs
        let interval = setInterval(() => {
            this.setState({
                countDownSecs: this.state.countDownSecs - ONE_SECOND_IN_MILISECONDS
            });
        }, ONE_SECOND_IN_MILISECONDS);

        // check countdown finished
        setTimeout(() => {
            this.setState({
                countFinished: true,
                countDownSecs: VERIFICATION_COUNTDOWN_MILISECONDS
            });

            // delete interval
            clearInterval(interval);
        }, VERIFICATION_COUNTDOWN_MILISECONDS);
    }


    send = () => {
        this.startCountDown();
        this.props.sendCode();
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.countFinished ?
                    <View>
                        <TouchableWithoutFeedback onPress={this.send} >
                            <Text style={styles.resendText}>Reenviar Código</Text>
                        </TouchableWithoutFeedback>
                        {this.state.codeResent &&
                            <Text style={styles.textWarning}>El código fue reenviado...</Text>
                        }
                    </View>
                    :
                    <Text style={styles.textWarning}>Reenviar código en... {this.state.countDownSecs / ONE_SECOND_IN_MILISECONDS} segundos</Text>
                }
            </View>
        );
    }
}

export default ResendVerCodeCountdown;
