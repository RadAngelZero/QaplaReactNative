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
import VerificationAskAge from '../../components/VerificationAskAge/VerificationAskAge';
import VerificationPhoneNumber from '../../components/VerificationPhoneNumber/VerificationPhoneNumber';
import ProgressStepsIndicator from '../../components/ProgressStepsIndicator/ProgressStepsIndicator';
import { sendVerificationSMSToUser, linkUserAccountWithPhone } from '../../services/auth';
import { PhoneProvider } from '../../utilities/firebase';
import VerificationProccessSuccess from '../../components/VerificationProccessSuccess/VerificationProccessSuccess';
import { createVerificationRequest } from '../../services/database';

const BackIcon = Images.svg.backIcon;
const CloseIcon = Images.svg.closeIcon;

class VerificationScreen extends Component {
    state = {
        personData:{
            name: '',
            firstSurname: '',
            secondSurname: ''
        },
        ageData:{
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
        numAttemptsCodeSent: 0
    };

    provideFeedBackToUserOnCurrentScren(optionalMessage) {
        if (optionalMessage) {
            console.log(optionalMessage);
        } else {
            console.log('Revise bien la informacion ingresada');
        }
    }

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
     * Set how many years has the user
     * @param {number} age Number oy years of living of the user
     */
    setAge = (age) => {
        const { ageData } = this.state;
        ageData.age = age;
        this.setState({ ageData });
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

            await this.setState({
                indexPositions: indexPositions,
                indexPositionsIsSorted: true
            })
        }

        switch (this.state.nextIndex) {
            case 1:
                isValidData = Object.keys(this.state.personData).some((value) => this.state.personData[value] !== '');
                break;
            case 2: 
                isValidData = Object.keys(this.state.ageData).some((value) => this.state.ageData[value] > 0);
                break;
            case this.state.indexPositions.length - 1:
                isValidData = Object.keys(this.state.phoneData).some((value) => this.state.phoneData[value] !== '');
                try {

                    /**
                     * Scroll to the position of the nextIndex, and update next index (we make that action here because
                     * the sendVerificationSMSToUser can take a (long) time in send the SMS, but we need to await for the result
                     * so we change the "slide", that other slide indicates the user that we are sending the code)
                     */
                    // this.scrollViewRef.scrollTo({x: this.state.indexPositions[this.state.nextIndex], y: 0, animated: true});
                    this.setState({ nextIndex: this.state.nextIndex + 1 });
                    
                    isUserOnSendCodeScreen = true;
                    
                    // Mechanism to control in VerificationPhoneNumber component if code was sent
                    this.setState({
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
                break;
            case this.state.indexPositions.length:
                isValidData = Object.keys(this.state.firebaseVerificationData).some((value) => this.state.firebaseVerificationData[value] !== '');

                /**
                 * Build of the credential object (to link current account with phone account)
                 */
                const phoneCredentials = PhoneProvider.credential(this.state.verificationObject.verificationId,
                    this.state.firebaseVerificationData.verificationCode);
                    try {
                        await linkUserAccountWithPhone(phoneCredentials);

                        /**
                         * The object to write on the database as the request of verification of the user
                         */
                        const verificationRequest = {
                            curp: '',
                            nombre: `${this.state.personData.name} ${this.state.personData.firstSurname} ${this.state.personData.secondSurname}`,
                            foto: '',
                            status: 1,
                            usuario: this.props.userName,

                        }
                        await createVerificationRequest(this.props.uid, verificationRequest);
                    } catch (error) {
                        
                        /**
                         * If the code is incorrect we mark the data as invalid and provide feedback to the user
                         * with a specific message
                         */
                        if (error.code === 'auth/invalid-verification-code') {
                            isValidData = false;
                            this.provideFeedBackToUserOnCurrentScren('Codigo de verificación incorrecto');
                        }
                    }
            default:
                break;
        }

        if (isValidData) {
            if (!isUserOnSendCodeScreen) {
                /**
                 * Scroll to the position of the nextIndex, so we can make things like validate data
                 * before that we show to the user the next "slide"
                 */
                this.scrollViewRef.scrollTo({x: this.state.indexPositions[this.state.nextIndex], y: 0, animated: true});
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
        this.scrollViewRef.scrollTo({x: this.state.indexPositions[this.state.nextIndex - 2], y: 0, animated: true});
        
        this.setState({
            nextIndex: this.state.nextIndex - 1,
            codeSent: false
        });
    }

    /**
     * Define the text displayed in the button
     */
    setButtonText = () => {
        // TODO Josep Maria: (maybe) 17-10-2019 : Create each button per separated insteda of applying
        // a lot of logic to one only button.
        let buttonText = 'Continuar';

        if (this.state.indexPositions.length >= 3) {
            if (this.state.nextIndex === this.state.indexPositions.length - 1) {
                buttonText = 'Enviar Código';
            } else if (this.state.nextIndex === this.state.indexPositions.length) {
                if (Object.keys(this.state.verificationObject).length <= 0) {
                    buttonText = 'Enviando codigo...';
                } else {
                    buttonText = 'Verificar';
                }
            } else if (this.state.nextIndex === this.state.indexPositions.length) {
                buttonText = 'Finalizar';
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
    closeVerificationProccess = () => this.props.navigation.navigate('Logros');

    /**
     * End the verification procces (once the procces is completed)
     */
    endVerificationProccess = () => this.props.navigation.navigate('Logros');

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.backAndCloseOptions}>
                    <View style={styles.backIconContainer}>
                        {/** Just show BackIcon if the user has already passed at least the first slide */}
                        {(this.state.nextIndex > 1 && this.state.nextIndex !== this.state.indexPositions.length + 1) ?
                            <TouchableWithoutFeedback onPress={this.goToPreviousStep}>
                                <View style={styles.buttonDimensions}>
                                    <BackIcon />
                                </View>
                            </TouchableWithoutFeedback>
                            :
                            <View style={styles.buttonDimensions} />
                        }
                    </View>
                    <View style={styles.closeIconContainer}>
                        {this.state.nextIndex !== this.state.indexPositions.length + 1 ?
                            <TouchableWithoutFeedback onPress={this.closeVerificationProccess}>
                                <View style={styles.buttonDimensions}>
                                    <CloseIcon />
                                </View>
                            </TouchableWithoutFeedback>
                            :
                            <View style={styles.buttonDimensions} />
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
                            <VerificationAskAge setAge={this.setAge} goToNextStep={this.goToNextStep}/>
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationPhoneNumber
                                setPhoneNumber={this.setPhoneNumber}
                                setPhonePrefix={this.setPhonePrefixObj}
                                setVerificationCode={this.setVerificationCode}
                                goToNextStep={this.goToNextStep}
                                codeSent={this.state.codeSent} />
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationProccessSuccess endVerificationProccess={this.endVerificationProccess} />
                        </View>
                    </ScrollView>
                </View>
                {this.state.nextIndex === this.state.indexPositions.length && this.state.codeSent &&
                    <TouchableWithoutFeedback onPress={this.sendVerificationCode} >
                      <View style={styles.resendContainer}>
                          <Text style={styles.resendText}>Reenviar Código</Text>
                          {this.state.numAttemptsCodeSent > 1 &&
                              <Text style={styles.smsWarning}>El código fue reenviado...</Text>
                          }
                      </View>
                    </TouchableWithoutFeedback>
                }
                {this.state.nextIndex !== this.state.indexPositions.length ?
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
                    <TouchableWithoutFeedback
                        onPress={this.endVerificationProccess}>
                        <View style={this.state.codeSent ? styles.buttonResendScenario : styles.button}>
                            <Text style={styles.buttonText}>
                                {this.setButtonText()}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                {(this.state.nextIndex === this.state.indexPositions.length && Object.keys(this.state.verificationObject).length <= 0) &&
                    <Text style={styles.smsWarning}>
                        Este proceso puede tomar{'\n'}algunos minutos, espera porfavor
                    </Text>
                }
                {/**
                    * The selected (or current) index is the nextIndex - 1, we use nextIndex instead of
                   * currentIndex for the goToNextStep and goToPrevStep functions, can be changed to current
                   * in the future, actually don't have a major implication, is just a way to do the work
                */}
                {this.state.nextIndex !== this.state.indexPositions.length &&
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
