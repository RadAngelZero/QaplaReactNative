import React, { Component } from 'react';

import {
	View,
	Image,
	TouchableWithoutFeedback,
	SafeAreaView,
	Linking,
	Platform
} from 'react-native';

import styles from './style';
import Images from '../../../assets/images';

import { translate } from '../../utilities/i18';

import {
	ANDROID_STORE_LINK,
	IOS_STORE_LINK
 } from '../../utilities/Constants';
import QaplaText from '../QaplaText/QaplaText';

const QaplaSignUpLogo = Images.png.qaplaSignupLogo.img;
const SignUpControllersBackgroundImage = Images.png.signUpControllers.img;

class UpdateApp extends Component {
    /**
     * Sends the user to the Platform's store
     */
    goToStore = () => {
    	const url = Platform.OS === 'ios' ? IOS_STORE_LINK : ANDROID_STORE_LINK;
    	Linking.openURL(url);
   	}

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <Image style={styles.backgroundImage}
                        source={SignUpControllersBackgroundImage} />
                <View style={styles.container}>
                    <View>
                        <Image source={QaplaSignUpLogo} />
                    </View>
                    <View style={styles.updateContainer}>
                    	<QaplaText style={styles.txtHeader}>
                    		{translate('updateApp.header')}
                    	</QaplaText>
                        <TouchableWithoutFeedback onPress={this.goToStore}>
			                <View style={styles.bttnContainer}>
			                    <QaplaText style={styles.txtBttn}>
			                    	{translate('updateApp.updateBttnTxt')}
			                    </QaplaText>
			                </View>
			            </TouchableWithoutFeedback>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default UpdateApp;
