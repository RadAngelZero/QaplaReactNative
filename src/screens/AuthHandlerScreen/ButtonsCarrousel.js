import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import QaplaText from '../../components/QaplaText/QaplaText';
import AnimatedMultipurposeButton from './AnimatedMultipurposeButton';

class ButtonsCarrousel extends Component {
    render() {
        let showFirstButton = (this.props.currentStep === 0 || this.props.showFirstButtonAsSignOption) && this.props.currentStep <= 0;
        return (
            <View>
                <AnimatedMultipurposeButton onPress={this.props.onFirstButtonPress}
                    onBackgroundRef={this.props.onFirstButtonBackgroundRef}
                    onTextRef={this.props.onFirstTextRef}
                    backgroundColors={this.props.firstButtonBackgroundColors}
                    disabled={!showFirstButton}>
                    <View style={styles.buttonTextContainer}>
                        <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                            Crear mi cuenta
                        </QaplaText>
                    </View>
                    <View style={styles.buttonWithIconContainer}>
                        {showFirstButton &&
                        <>
                            <images.svg.appleIcon height={32} width={32} style={{ marginRight: 8 }} />
                            <QaplaText style={[styles.buttonText, { color: '#FFF' }]}>
                                Continuar con Apple
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
                            Ya tengo cuenta
                        </QaplaText>
                    </View>
                    <View style={styles.buttonWithIconContainer}>
                        <images.svg.googleIcon height={32} width={32} style={{ marginRight: 8 }} />
                        <QaplaText style={[styles.buttonText, { color: '#585858' }]}>
                            Continuar con Google
                        </QaplaText>
                    </View>
                    <View style={styles.buttonTextContainer}>
                        {!this.props.hideEmailUI &&
                            <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                                Continuar
                            </QaplaText>
                        }
                    </View>
                    <View style={styles.buttonWithIconContainer}>
                        <QaplaText style={[styles.buttonText, { color: '#0D1021' }]}>
                            {this.props.checkingUserName ?
                                'Validando Username...'
                                :
                                '¡Estoy listo!'
                            }
                        </QaplaText>
                    </View>
                </AnimatedMultipurposeButton>
            </View>
        );
    }
}

export default ButtonsCarrousel;
