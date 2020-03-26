// diego           - 20-12-2019 - us179 - Added phone autoverification, only works for Android
// diego           - 17-12-2019 - us174 - Age case merged into personal data case
// diego           - 18-12-2019 - us173 - Removed age case
// josep.sanahuja  - 18-12-2019 - us178 - Add ResendVerCodeCountdown &
//                                        ProgressStepsIndicator <= indexPositions.length
// josep.sanahuja  - 18-12-2019 - us177 - Add resend verification code logic & UI
// josep.sanahuja  - 18-12-2019 - us176 - Phone Verification in one screen
// josep.sanahuja  - 17-10-2019 - us134 - Added phone prefix to SMS verification
// josep.sanahuja  - 17-10-2019 - us141 - Add age to verificationRequest
// josep.sanahuja  - 08-10-2019 - usXXX - Removed VerificationTakeSelfie && added
//                                        VerificationAskAge
// josep.sanahuja  - 08-10-2019 - usXXX - Sort indexPositions array in crescendo order
// josep.sanahuja  - 08-10-2019 - usXXX - Add selfie.storageUrl
// josep.sanahuja  - 22-09-2019 - us122 - Add VerificationTakeSelfie
// diego           - 18-09-2019 - us119 - File creation

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import VerificationPersonalData from '../../components/VerificationPersonalData/VerificationPersonalData';
import VerificationPhoneNumber from '../../components/VerificationPhoneNumber/VerificationPhoneNumber';
import ProgressStepsIndicator from '../../components/ProgressStepsIndicator/ProgressStepsIndicator';
import ResendVerCodeCountdown from '../../components/ResendVerCodeCountdown/ResendVerCodeCountdown';
import VerificationProccessSuccess from '../../components/VerificationProccessSuccess/VerificationProccessSuccess';

import { sendVerificationSMSToUser, linkUserAccountWithPhone } from '../../services/auth';
import { createVerificationRequest } from '../../services/database';
import { PhoneProvider } from '../../utilities/firebase';
import { translate } from '../../utilities/i18';

import {
    ACCOUNT_ALREADY_IN_USE,
    ACCOUNT_INVALID_CREDENTIAL,
    ACCOUNT_ALREADY_LINKED_TO_USER_ACCOUNT,
    ACCOUNT_ALREADY_LINKED_TO_USER_ACCOUNT_IOS
} from '../../utilities/Constants';
import QaplaIcon from '../../components/QaplaIcon/QaplaIcon';

const BackIcon = Images.svg.backIcon;
const CloseIcon = Images.svg.closeIcon;

class VerificationScreen extends Component {
    state = {
        personData:{
            name: '',
            firstSurname: '',
            secondSurname: '',
            age: 0
        },
        phoneData: {
            phoneNumber: '',
            prefixObj: {
                "alpha2Code": "MX",
                "name": "México",
                "callingCodes": [
                  "52"
                ]
            }
        },
        firebaseVerificationData: {
            verificationCode: ''
        },
        nextIndex: 1,
        verificationObject: {},
        indexPositions: [],
        indexPositionsIsSorted: false,
        numAttemptsCodeSent: 0,
        codeSent: false,
        errorSMSCode: false,
        errorAlreadyLinkedAccount: false,
        errorMinPhoneDigits: false
    };

    /**
     * Define a ref for the ScrollView UI element
     * @param {element} element ScrollView
     */
    setScrollViewRef = (element) => {
        this.scrollViewRef = element;
    };

    /**
     * Set the fields of the first slide
     * @param {string} dataKey Name of the state variable to update
     * @param {string} data Data to store on the state
     */
    setUserPersonalData = (dataKey, data) => {
        const { personData } = this.state;
        personData[dataKey] = data;
        this.setState({ personData });
    }

    /**
     * Set the telephonic number of the user
     * @param {string} phoneNumber Phone number of the user
     */
    setPhoneNumber = (phoneNumber) => {
        const { phoneData } = this.state;
        phoneData.phoneNumber = phoneNumber;
        this.setState({ phoneData });
    }

    /**
     * Set the telephonic number prefix object of the user
     * @param {object} prefixObj Phone number prefix obj of the user
     */
    setPhonePrefixObj = (prefixObj) => {
        const { phoneData } = this.state;
        phoneData.prefixObj = prefixObj;
        this.setState({ phoneData });
    }

    /**
     * Set the verification code sent to the user
     * @param {string} verificationCode Verification code that the user get by a SMS sended by firebase
     */
    setVerificationCode = (verificationCode) => {
        const { firebaseVerificationData } = this.state;

        firebaseVerificationData.verificationCode = verificationCode;
        this.setState({ firebaseVerificationData });
    }

    /**
     * Add the position of the different slides (one per call)
     * @param {number} position X value of the given component (slide)
     */
    setIndexPosition = (position) => {
        const { indexPositions } = this.state;

        /**
         * Save the X position of the slide to know where to scroll to show the right element of
         * the "carousel"
         */
        indexPositions.push(position);
        this.setState({ indexPositions });
    }

    /**
     * Scroll the ScrollView to the next step of the form
     */
    goToNextStep = async () => {
        let isValidData = true;

        /**
         * Flag used because we don't want to scroll two times when the user is on VerificationCode.js
         */
        let isUserOnSendCodeScreen = false;

        // Components are rendered in a random order, specially in IOS,
        // therefore it is a bad practice to think that onLayout will be called
        // for the first component declared, then the onLayout from the second
        // component declared and so on. This results on having an array with x
        // offsets for the components layout location, but with no established order,
        // everytime the app renders the screen, the elements from the screen are
        // likely in a different position. For that reason to ensure an order of
        // navigation the indexPositions array is sortedin increment order.
        if (!this.state.indexPositionsIsSorted) {
            const {indexPositions} = this.state;

            // sort array of x offsets from smaller to bigger
            indexPositions.sort((a, b) => {return a - b});

            this.setState({
                indexPositions: indexPositions,
                indexPositionsIsSorted: true
            });
        }

        switch (this.state.nextIndex) {
            case 1:
                isValidData = !Object.keys(this.state.personData).some((value) => this.state.personData[value] === '' || this.state.personData[value] === 0);
                break;
            case this.state.indexPositions.length - 1:
                // In some countries like Spain the number of digits in a phone number is
                // 9, in Mexico is 10. Therefore the approach for number validation is
                // to require a ridiculous minim of digits, so that users don't go crazy 
                // on trials with phone numbers of #2 #3 digits. If the phone number does not exist
                // an UNKNOWN_ERROR should be expected (this last statement need to be 100% confirmed,
                // it is an hypothesis).  
                const MIN_PHONE_NUM_DIGITS = 5;
                isValidData = this.state.phoneData.phoneNumber.length >= MIN_PHONE_NUM_DIGITS;
                
                if (isValidData) {
                    try {
                        isUserOnSendCodeScreen = true;

                        // Mechanism to control in VerificationPhoneNumber component if code was sent
                        this.setState({
                            nextIndex: this.state.nextIndex + 1,
                            codeSent: true
                        });

                        /**
                         * Once we have the verification object (after we await for the SMS) we add it to the state
                         * so we can render new things on the screen, to let the user add their code and procceed
                         */
                        this.sendVerificationCode();
                    } catch (error) {
                        console.error(error);
                    }
                }
                else {
                    this.setState({errorMinPhoneDigits: true});
                }
                break;
            case this.state.indexPositions.length:
                isValidData = !Object.keys(this.state.firebaseVerificationData).some((value) => this.state.firebaseVerificationData[value] === '');

                if (isValidData) {
                    this.setState({ errorSMSCode: false, errorAlreadyLinkedAccount: false });
                    isValidData = await this.verifyUserPhone(this.state.verificationObject.verificationId, this.state.firebaseVerificationData.verificationCode);
                }
                break;
            default:
                break;
        }

        if (isValidData) {
            if (!isUserOnSendCodeScreen) {
                /**
                 * If the nextIndex is smaller than the lenght of index we need to move just one screen
                 */
                if (this.state.nextIndex < this.state.indexPositions.length) {
                    /**
                     * Scroll to the position of the nextIndex, so we can make things like validate data
                     * before that we show to the user the next "slide"
                     */
                    this.scrollViewRef.scrollTo({ x: this.state.indexPositions[this.state.nextIndex], y: 0, animated: true });
                } else {
                    /**
                     * If the nextIndex is greater than the lenght of index we move to the last "slide" (this.state.indexPositions.length - 1)
                     */
                    this.scrollViewRef.scrollTo({ x: this.state.indexPositions[this.state.indexPositions.length - 1], y: 0, animated: true });
                }
                this.setState({ nextIndex: this.state.nextIndex + 1 });
            }
        }
    }

    /**
     * Scroll the ScrollView to the previous step of the form
     */
    goToPreviousStep = () => {

        /**
         * Example to understand: this.state.nextIndex - 2
         * this.stat.nextIndex = 2 so currentIndex = 1 so previousIndex = 0
         * So to get 0 you need to remove 2 fromthis.stat.nextIndex (2 - 2 = 0)
         */
        this.scrollViewRef.scrollTo({ x: this.state.indexPositions[this.state.nextIndex - 2], y: 0, animated: true });

        this.setState({
            nextIndex: this.state.nextIndex - 1,
            codeSent: false
        });
    }

    /**
     * Verify the user phone and end the process (as verify the phone is the last case of the process)
     * @param {string} verificationId Id of the verification process (given by firebase)
     * @param {number} verificationCode Code sended to the user to verify their phone number
     */
    verifyUserPhone = async (verificationId, verificationCode) => {
        let accountsLinked = true;

        /**
         * Build of the credential object (to link current account with phone account)
         */
        try {
            const phoneCredentials = PhoneProvider.credential(verificationId, verificationCode);
            await linkUserAccountWithPhone(phoneCredentials);

            /**
             * The object to write on the database as the request of verification of the user
             */
            const verificationRequest = {
                curp: '',
                nombre: `${this.state.personData.name} ${this.state.personData.firstSurname} ${this.state.personData.secondSurname}`,
                telefono: `+${this.state.phoneData.prefixObj.callingCodes[0]}${this.state.phoneData.phoneNumber}`,
                foto: '',
                status: 1,
                usuario: this.props.userName,
                age: this.state.personData.age
            };

            createVerificationRequest(this.props.uid, verificationRequest);

        } catch (error) {
            console.log(error);
            switch (error.code) {
                case ACCOUNT_INVALID_CREDENTIAL:
                    this.setState({ errorSMSCode: true });
                    accountsLinked = false;
                    break;
                case ACCOUNT_ALREADY_IN_USE:
                    this.setState({ errorAlreadyLinkedAccount: true });
                    accountsLinked = false;
                    break;
                case ACCOUNT_ALREADY_LINKED_TO_USER_ACCOUNT:
                    this.setState({ errorAlreadyLinkedAccount: true });
                    accountsLinked = false;
                    break;
                case ACCOUNT_ALREADY_LINKED_TO_USER_ACCOUNT_IOS:
                    this.setState({ errorAlreadyLinkedAccount: true });
                    accountsLinked = false;
                    break;
            }
        }

        return accountsLinked;
    }

    /**
     * Define the text displayed in the button
     */
    setButtonText = () => {
        // TODO Josep Maria: (maybe) 17-10-2019 : Create each button per separated insteda of applying
        // a lot of logic to one only button.
        let buttonText = translate('verificationScreen.continue');

        if (this.state.indexPositions.length >= 3) {
            if (this.state.nextIndex === this.state.indexPositions.length - 1) {
                buttonText = translate('verificationScreen.sendCode');
            } else if (this.state.nextIndex === this.state.indexPositions.length) {
                buttonText = translate('verificationScreen.verify');
            } else if (this.state.nextIndex >= this.state.indexPositions.length + 1) {
                buttonText = translate('verificationScreen.finish');
            }
        }

        return buttonText;
    }

    /**
     * Sends again the verification code via Firebase
     */
    sendVerificationCode = async () => {
        this.setState({
            numAttemptsCodeSent: this.state.numAttemptsCodeSent + 1
        });

        /**
         * Once we have the verification object (after we await for the SMS) we add it to the state
         * so we can render new things on the screen, to let the user add their code and procceed
         */
        this.setState({
            verificationObject: await sendVerificationSMSToUser(`+${this.state.phoneData.prefixObj.callingCodes[0]}${this.state.phoneData.phoneNumber}`)
        });
    }

    /**
     * Close the verification procces (interrupt the proccess)
     */
    closeVerificationProccess = () => this.props.navigation.pop();

    /**
     * End the verification procces (once the procces is completed)
     */
    endVerificationProccess = () => this.props.navigation.pop();

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.backAndCloseOptions}>
                    <View style={styles.backIconContainer}>
                        {/** Just show BackIcon if the user has already passed at least the first slide */}
                        {(this.state.nextIndex > 1 && this.state.nextIndex !== this.state.indexPositions.length + 1) ?
                            <QaplaIcon onPress={this.goToPreviousStep}>
                                <BackIcon />
                            </QaplaIcon>
                            :
                            null
                        }
                    </View>
                    <View style={styles.closeIconContainer}>
                        {this.state.nextIndex !== this.state.indexPositions.length + 1 ?
                            <QaplaIcon onPress={this.closeVerificationProccess}>
                                <CloseIcon />
                            </QaplaIcon>
                            :
                            null
                        }
                    </View>
                </View>
                <View style={styles.scrollViewContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        ref={this.setScrollViewRef}>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationPersonalData
                                setUserPersonalData={this.setUserPersonalData}
                                goToNextStep={this.goToNextStep} />
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationPhoneNumber
                                setPhoneNumber={this.setPhoneNumber}
                                setPhonePrefix={this.setPhonePrefixObj}
                                setVerificationCode={this.setVerificationCode}
                                goToNextStep={this.goToNextStep}
                                wrongCode={this.state.errorSMSCode}
                                alreadyLinkedError={this.state.errorAlreadyLinkedAccount}
                                minNumDigitsError={this.state.errorMinPhoneDigits}
                                codeSent={this.state.codeSent} />
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationProccessSuccess endVerificationProccess={this.endVerificationProccess} />
                        </View>
                    </ScrollView>
                </View>
                {this.state.nextIndex < this.state.indexPositions.length + 1 ?
                    <TouchableWithoutFeedback
                        onPress={this.goToNextStep}
                        disabled={this.state.nextIndex === this.state.indexPositions.length && Object.keys(this.state.verificationObject).length <= 0}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.setButtonText()}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback onPress={this.endVerificationProccess}>
                        <View style={this.state.codeSent ? styles.buttonResendScenario : styles.button}>
                            <Text style={styles.buttonText}>
                                {this.setButtonText()}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                {((this.state.nextIndex === this.state.indexPositions.length) && this.state.codeSent) &&
                    <View style={styles.resendContainer}>
                        <ResendVerCodeCountdown sendCode={this.sendVerificationCode} />
                    </View>
                }
                {/**
                    * The selected (or current) index is the nextIndex - 1, we use nextIndex instead of
                   * currentIndex for the goToNextStep and goToPrevStep functions, can be changed to current
                   * in the future, actually don't have a major implication, is just a way to do the work
                */}
                {this.state.nextIndex <= this.state.indexPositions.length + 1 &&
                    <ProgressStepsIndicator
                        steps={this.state.indexPositions.length}
                        selected={this.state.nextIndex - 1} />
                }
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps(state) {
    return {
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName
    }
}

export default connect(mapDispatchToProps)(VerificationScreen);
