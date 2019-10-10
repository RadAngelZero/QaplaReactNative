// josep.sanahuja  - 08-10-2019 - usXXX - Sort indexPositions array in crescendo order
// josep.sanahuja  - 22-09-2019 - us122 - Add VerificationTakeSelfie
// diego           - 18-09-2019 - us119 - File creation

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import Images from './../../../assets/images';
import VerificationPersonalData from '../../components/VerificationPersonalData/VerificationPersonalData';
import VerificationTakeSelfie from '../../components/VerificationTakeSelfie/VerificationTakeSelfie';
import VerificationPhoneNumber from '../../components/VerificationPhoneNumber/VerificationPhoneNumber';
import VerificationCode from '../../components/VerificationCode/VerificationCode';
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
        selfie: {
            cameraVisible: false,
            picture: {uri: "", base64: ""}
        },
        phoneData: {
            phoneNumber: ''
        },
        firebaseVerificationData: {
            verificationCode: ''
        },
        nextIndex: 1,
        verificationObject: {},
        indexPositions: [],
        indexPositionsIsSorted: false
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
     * Set the telephonic number of the user
     * @param {string} phoneNumber Phone number of the user
     */
    setPhoneNumber = (phoneNumber) => {
        const { phoneData } = this.state;
        phoneData.phoneNumber = phoneNumber;
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
     * Set the camera to either visible or invisible
     * @param {boolean} mode Camera visible mode
     */
    setCameraVisible = (mode) => {
        const { selfie } = this.state;
        selfie.cameraVisible = mode;
        this.setState({ selfie });
    }

    /**
    * Saves the picture to the state so it can be used.
    * 
    * @param {object} pict Object representing a picture, with uri and base64 props
    */
    savePicture = (pict) => {
        const { selfie } = this.state;
        selfie.picture.uri = pict.uri;
        selfie.picture.base64 = pict.base64;
        this.setState({ selfie });
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
            case this.state.indexPositions.length - 2:
                isValidData = Object.keys(this.state.phoneData).some((value) => this.state.phoneData[value] !== '');
                try {

                    /**
                     * Scroll to the position of the nextIndex, and update next index (we make that action here because
                     * the sendVerificationSMSToUser can take a (long) time in send the SMS, but we need to await for the result
                     * so we change the "slide", that other slide indicates the user that we are sending the code)
                     */
                    this.scrollViewRef.scrollTo({x: this.state.indexPositions[this.state.nextIndex], y: 0, animated: true});
                    this.setState({ nextIndex: this.state.nextIndex + 1 });

                    isUserOnSendCodeScreen = true;

                    /**
                     * Once we have the verification object (after we await for the SMS) we add it to the state
                     * so we can render new things on the screen, to let the user add their code and procceed
                     */
                    this.setState({ verificationObject: await sendVerificationSMSToUser(`+52${this.state.phoneData.phoneNumber}`) });
                } catch (error) {
                    console.error(error);
                }
                break;
            case this.state.indexPositions.length - 1:
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
                            foto: '', // Add download url of the photo
                            status: 1,
                            usuario: this.props.userName,
                            whatsapp: this.state.phoneData.phoneNumber
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
        this.setState({ nextIndex: this.state.nextIndex - 1 });
    }

    /**
     * Define the text displayed in the button
     */
    setButtonText = () => {
        let buttonText = 'Continuar';
        if (this.state.indexPositions.length >= 4) {
            if (this.state.nextIndex === this.state.indexPositions.length - 2) {
                buttonText = 'Enviar Código';
            } else if (this.state.nextIndex === this.state.indexPositions.length - 1) {
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
                        {(this.state.nextIndex > 1 && this.state.nextIndex !== this.state.indexPositions.length) ?
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
                        {this.state.nextIndex !== this.state.indexPositions.length ?
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
                            <VerificationTakeSelfie
                                setCameraVisible={this.setCameraVisible}
                                savePicture={this.savePicture}
                                picture={this.state.selfie.picture}
                                cameraVisible={this.state.selfie.cameraVisible}
                                />
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationPhoneNumber
                                setPhoneNumber={this.setPhoneNumber}
                                goToNextStep={this.goToNextStep} />
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationCode
                                setVerificationCode={this.setVerificationCode}
                                goToNextStep={this.goToNextStep} />
                        </View>
                        <View onLayout={(event) => this.setIndexPosition(event.nativeEvent.layout.x)}>
                            <VerificationProccessSuccess endVerificationProccess={this.endVerificationProccess} />
                        </View>
                    </ScrollView>
                </View>
                {this.state.nextIndex !== this.state.indexPositions.length ?
                    <TouchableWithoutFeedback
                        onPress={this.goToNextStep}
                        disabled={this.state.nextIndex === this.state.indexPositions.length - 1 && Object.keys(this.state.verificationObject).length <= 0}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.setButtonText()}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback
                        onPress={this.endVerificationProccess}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.setButtonText()}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                {(this.state.nextIndex === this.state.indexPositions.length - 1 && Object.keys(this.state.verificationObject).length <= 0) &&
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
