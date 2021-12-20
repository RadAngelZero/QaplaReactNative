import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './style';
import QaplaText from '../../components/QaplaText/QaplaText';
import TranslateXContainer from './TranslateXContainer';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import QaplaTextInput from '../QaplaTextInput/QaplaTextInput';
import { translate } from '../../utilities/i18';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import TermsAndConditionsModal from '../../components/TermsAndConditionsModal/TermsAndConditionsModal';

class TextsCarrousel extends Component {
    state= {
        openTermsModal: false,
        openPrivacyModal: false
    };

    /**
      * Open the terms and conditions modal
      */
    openTermsModal = () => this.setState({ openTermsModal: true });

     /**
      * Open the privacy modal
      */
    openPrivacyModal = () => this.setState({ openPrivacyModal: true });

     /**
      * Close the terms and conditions modal
      */
    closeTermsAndConditionsModal = () => this.setState({ openTermsModal: false });

     /**
      * Close the privacy modal
      */
    closePrivacyModal = () => this.setState({ openPrivacyModal: false });

    render() {
        return (
            <TranslateXContainer onRef={this.props.textOnRef}
                individualComponentWidth={widthPercentageToPx(100)}>
                <View style={styles.titleAndDescriptionContainer} />
                <View style={styles.titleAndDescriptionContainer}>
                    <QaplaText style={styles.title}>
                        ¡Bienvenido!
                    </QaplaText>
                    <QaplaText style={styles.description}>
                        Crea una cuenta o inicia sesión para unirte a los streams
                    </QaplaText>
                </View>
                <View style={styles.titleAndDescriptionContainer}>
                    <QaplaText style={styles.title}>
                        {this.props.showCreateAccountScreen ?
                            'Crea tu cuenta'
                            :
                            'Inicia sesión'
                        }
                    </QaplaText>
                    <QaplaText style={styles.description}>
                        {this.props.showCreateAccountScreen ?
                            'Descubre a tu primer streamer ¡ahora!'
                            :
                            '¡Bienvenido de vuelta! Te extrañamos :v'
                        }
                    </QaplaText>
                </View>
                <View style={styles.titleAndDescriptionContainer}>
                        <QaplaText style={[styles.title, { marginTop: 72, color: this.props.hideEmailUI ? 'transparent' : '#FFF' }]}>
                            {this.props.showCreateAccountScreen ?
                                'Crea tu cuenta con correo'
                                :
                                'Inicia sesión con correo'
                            }
                        </QaplaText>
                        <View style={styles.emailFormContainer}>
                            <>
                            <QaplaTextInput onChangeText={this.props.onEmailChange}
                                style={{ backgroundColor: this.props.hideEmailUI ? 'transparent' : '#0D1022', color: this.props.hideEmailUI ? 'transparent' : '#00FFDC' }}
                                placeholderTextColor={this.props.hideEmailUI ? 'transparent' : 'rgba(0, 255, 220, 0.35)'}
                                value={this.props.email}
                                keyboardType='email-address'
                                placeholder='Correo' />
                            <QaplaTextInput onChangeText={this.props.onPasswordChange}
                                style={{ marginTop: 24, backgroundColor: this.props.hideEmailUI ? 'transparent' : '#0D1022' }}
                                placeholderTextColor={this.props.hideEmailUI ? 'transparent' : 'rgba(0, 255, 220, 0.35)'}
                                secureTextEntry
                                value={this.props.password}
                                placeholder='Password' />
                            </>
                        </View>
                </View>
                <View style={styles.titleAndDescriptionContainer}>
                    <QaplaText style={[styles.title]}>
                        Crea tu nombre de usuario
                    </QaplaText>
                    <View style={styles.usernameContainer}>
                        <QaplaTextInput onChangeText={this.props.onUsernameChange}
                            value={this.props.username}
                            placeholder='Username' />
                    </View>
                    {this.props.showUsernameErrorMessage &&
                        <View>
                            <QaplaText style={styles.errorMessage}>{translate('chooseUserNameScreen.userNameAlreadyTaken')}</QaplaText>
                        </View>
                    }
                    <QaplaText style={styles.termsAndConditionsText}>
                        {`${translate('chooseUserNameScreen.bodyFirstPart')} `}
                        <QaplaText style={styles.hyperlinkText} onPress={this.openTermsModal}>
                            {translate('chooseUserNameScreen.termsAndConditions')}
                        </QaplaText>
                        {` ${translate('chooseUserNameScreen.bodySecondPart')} `}
                        <QaplaText style={styles.hyperlinkText} onPress={this.openPrivacyModal}>
                            {translate('chooseUserNameScreen.privacyPolicy')}
                        </QaplaText>
                    </QaplaText>
                    <PrivacyModal
                        open={this.state.openPrivacyModal}
                        onClose={this.closePrivacyModal} />
                    <TermsAndConditionsModal
                        open={this.state.openTermsModal}
                        onClose={this.closeTermsAndConditionsModal} />
                </View>
            </TranslateXContainer>
        );
    }
}

export default TextsCarrousel;
