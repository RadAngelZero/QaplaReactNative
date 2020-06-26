// diego           - 18-12-2019 - us173 - onSubmitEditing event added to execute goToNextStep
// josep.sanahuja  - 18-12-2019 - us176 - Added VerificationCode UI and logic
// josep.sanahuja  - 17-10-2019 - us134 - Added PhonePrefixPicker
// diego           - 19-09-2019 - us126 - File creation

import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

import PhonePrefixPicker from './PhonePrefixPicker/PhonePrefixPicker';
import { translate } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';

const Divider = images.png.divider.img;

export class VerificationPhoneNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false
        };
    }

    /**
     * Toggle the selection of the TextInput so the user can know when the text input is selected
     * (we show the cool border bottom color when selected is true)
     */
    toggleInputSelection = () => {
        this.setState({ selected: !this.state.selected });
    }

    render() {
        let feedbackForUser = translate('verificationScreen.verificationPhoneNumber.codeSent');

        if (this.props.wrongCode) {
            feedbackForUser = translate('verificationScreen.verificationPhoneNumber.smsCodeError');
        } 
        else if (this.props.alreadyLinkedError) {
            feedbackForUser = translate('verificationScreen.verificationPhoneNumber.alreadyLinkedAccountError');
        }
        else if (this.props.minNumDigitsError) {
            feedbackForUser = translate('verificationScreen.verificationPhoneNumber.noMinDigitsPhoneNum');
        }

        return (
                <View style={styles.container}>
                    <View>
                        <QaplaText style={styles.title}>{translate('verificationScreen.verificationPhoneNumber.title')}</QaplaText>
                        <View style={styles.divider}>
                            <Image source={Divider} />
                        </View>
                    </View>
                    <View style={styles.phoneMainContainer}>
                        {!this.props.codeSent ?
                            <View style={styles.phoneContainer}>
                                <PhonePrefixPicker onChangePrefix={this.props.setPhonePrefix}/>
                                <TextInput
                                    keyboardType='numeric'
                                    style={[styles.qaplaTextInput, { borderBottomColor: this.state.selected ? '#3DF9DF' : '#B5B5B5' } ]}
                                    onFocus={this.toggleInputSelection}
                                    onBlur={this.toggleInputSelection}
                                    placeholder={translate('verificationScreen.verificationPhoneNumber.phonePlaceholder')}
                                    placeholderTextColor='#898A97'
                                    onSubmitEditing={this.props.goToNextStep}
                                    onChangeText={this.props.setPhoneNumber} />
                            </View>
                            :
                            <>
                                <View style={styles.codeContainer}>
                                    <TextInput
                                        keyboardType='numeric'
                                        style={[styles.qaplaTextInput, { borderBottomColor: this.state.selected ? '#3DF9DF' : '#B5B5B5' } ]}
                                        onFocus={this.toggleInputSelection}
                                        onBlur={this.toggleInputSelection}
                                        placeholder={translate('verificationScreen.verificationPhoneNumber.codePlaceholder')}
                                        placeholderTextColor='#898A97'
                                        onSubmitEditing={this.props.goToNextStep}
                                        onChangeText={this.props.setVerificationCode} />
                                </View>
                                <QaplaText style={styles.smallText}>
                                    {feedbackForUser}
                                </QaplaText>
                            </>
                        }
                    </View>
                </View>
        );
    }
}

export default VerificationPhoneNumber;
