import React, { Component } from 'react';

import { 
	View,
	Image,
	Text,
	TouchableWithoutFeedback,
	SafeAreaView,
	Linking,
	Platform
} from 'react-native';

import styles from './style';
import Images from '../../../assets/images';

import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { translate } from '../../utilities/i18';

import {
	ANDROID_STORE_LINK,
	IOS_STORE_LINK
 } from '../../utilities/Constants';

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
                    	<Text style={styles.txtHeader}>
                    		{translate('updateApp.header')}
                    	</Text>
                        <TouchableWithoutFeedback onPress={this.goToStore}>
			                <View style={styles.bttnContainer}>
			                    <Text style={styles.txtBttn}>
			                    	{translate('updateApp.updateBttnTxt')}
			                    </Text>
			                </View>
			            </TouchableWithoutFeedback>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default UpdateApp;
