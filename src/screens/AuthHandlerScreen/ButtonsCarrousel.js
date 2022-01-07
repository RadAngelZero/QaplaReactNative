import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import QaplaText from '../../components/QaplaText/QaplaText';
import AnimatedMultipurposeButton from './AnimatedMultipurposeButton';
import { translate } from '../../utilities/i18';

class ButtonsCarrousel extends Component {
    render() {
        let showFirstButton = (this.props.currentStep <= -1 || this.props.showFirstButtonAsSignOption);
        return (
            <View>
                <AnimatedMultipurposeButton onPress={this.props.onFirstButtonPress}
                    onBackgroundRef={this.props.onFirstButtonBackgroundRef}
                    onTextRef={this.props.onFirstTextRef}
                    backgroundColors={this.props.firstButtonBackgroundColors}
                    disabled={!showFirstButton}>
                    <View style={styles.buttonTextContainer}>
                        <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                            {translate('authHandlerScreen.buttonsCarrousel.createAccount')}
                        </QaplaText>
                    </View>
                    <View style={styles.buttonWithIconContainer}>
                        {this.props.showFirstButtonAsSignOption &&
                        <>
                            <images.svg.appleIcon height={32} width={32} style={{ marginRight: 8 }} />
                            <QaplaText style={[styles.buttonText, { color: '#FFF' }]}>
                                {translate('authHandlerScreen.buttonsCarrousel.continueWithApple')}
                            </QaplaText>
                        </>
                        }
                    </View>
                    <View style={styles.buttonTextContainer} />
                    <View style={styles.buttonTextContainer} />
                </AnimatedMultipurposeButton>
                <View style={{ marginTop: 24 }} />
                <AnimatedMultipurposeButton onPress={this.props.onSecondButtonPress}
                    onBackgroundRef={this.props.onSecondButtonBackgroundRef}
                    onTextRef={this.props.onSecondTextRef}
                    backgroundColors={this.props.secondButtonBackgroundColors}
                    disabled={this.props.checkingUserName}>
                    <View style={styles.buttonTextContainer}>
                        <QaplaText style={[styles.buttonText, { color: '#FFF' }]}>
                            {translate('authHandlerScreen.buttonsCarrousel.alreadyHaveAccount')}
                        </QaplaText>
                    </View>
                    <View style={styles.buttonWithIconContainer}>
                        <images.svg.googleIcon height={32} width={32} style={{ marginRight: 8 }} />
                        <QaplaText style={[styles.buttonText, { color: '#585858' }]}>
                            {translate('authHandlerScreen.buttonsCarrousel.continueWithGoogle')}
                        </QaplaText>
                    </View>
                    <View style={styles.buttonTextContainer}>
                        {!this.props.hideEmailUI &&
                            <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                                {translate('authHandlerScreen.buttonsCarrousel.continue')}
                            </QaplaText>
                        }
                    </View>
                    <View style={styles.buttonWithIconContainer}>
                        <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                            {this.props.checkingUserName ?
                                translate('authHandlerScreen.buttonsCarrousel.validatingUsername')
                                :
                                translate('authHandlerScreen.buttonsCarrousel.iamReady')
                            }
                        </QaplaText>
                    </View>
                </AnimatedMultipurposeButton>
            </View>
        );
    }
}

export default ButtonsCarrousel;
