// josep.sanahuja - 18-12-2019 - us178 - File creation

import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';

import {
    VERIFICATION_COUNTDOWN_MILISECONDS,
    ONE_SECOND_IN_MILISECONDS
} from './../../utilities/Constants';

const BackIcon = Images.svg.backIcon;

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
                countFinished: true
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
                {this.state.countFinished && 
                    <View>
                        <TouchableWithoutFeedback onPress={this.send} >
                            <Text style={styles.resendText}>Reenviar Código</Text>
                        </TouchableWithoutFeedback>
                        {this.state.codeResent &&
                            <Text style={styles.textWarning}>El código fue reenviado...</Text>
                        }
                    </View>
                }
                {!this.state.countFinished && 
                    <Text style={styles.textWarning}>Reenviar código en... {this.state.countDownSecs / ONE_SECOND_IN_MILISECONDS} segundos</Text>
                }
            </View>
            
        );
    }
}

export default ResendVerCodeCountdown;
