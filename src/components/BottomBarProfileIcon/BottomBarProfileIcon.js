import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Svg, { Path } from 'react-native-svg';

import { translate } from '../../utilities/i18';
import { retrieveData } from '../../utilities/persistance';
import SignUpModal from '../SignUpModal/SignUpModal';
import Colors from './../../utilities/Colors';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';

class BottomBarProfileIcon extends Component {
    state = {
        imageVersion: 0,
        openAuthModal: false
    };

    componentDidMount() {
        this.getImageVersion();
    }

    getImageVersion = async () => {
        const imageVersion = await retrieveData('avatarImageVersion');

        this.setState({ imageVersion });
    }

    onSignUpSuccess = () => {
        this.props.navigation.navigate('UserProfile');
        this.setState({ openAuthModal: false });
    }

    goToProfile = () => {
        if (this.props.uid) {
            return this.props.navigation.navigate('UserProfile');
        }

        return this.setState({ openAuthModal: true });
    }

    render() {
        let {
            tintColor,
            focused,
            avatarId,
            avatarBackground,
            photoUrl
        } = this.props;

        const avatarImage = `https://api.readyplayer.me/v1/avatars/${avatarId}.png?scene=fullbody-portrait-v1-transparent&version=${this.state.imageVersion}`;

        if (!avatarBackground) {
            avatarBackground = Colors.avatarImagesBackgroundGradients[0];
        }

        return (
            <TouchableOpacity style={{
                    backgroundColor: '#141833',
                    height: heightPercentageToPx(5.91),
                    width: '100%',
                    justifyContent: 'center',
                    borderTopLeftRadius: 100,
                    borderBottomLeftRadius: 100,
                    alignItems: 'center',
                }}
                onPress={this.goToProfile}>
                {!avatarId && !photoUrl ?
                    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M21.909 8.68181C21.909 11.8198 19.3652 14.3636 16.2272 14.3636C13.0892 14.3636 10.5454 11.8198 10.5454 8.68181C10.5454 5.54384 13.0892 3 16.2272 3C19.3652 3 21.909 5.54384 21.909 8.68181Z" fill={focused ? tintColor : "white"} />
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M23.975 17.9147C23.2745 17.1026 22.0713 17.1444 21.1306 17.6594C19.6748 18.4562 18.004 18.9093 16.2273 18.9093C14.4506 18.9093 12.7797 18.4562 11.3239 17.6594C10.3831 17.1444 9.18001 17.1026 8.47954 17.9147C6.93434 19.7063 6 22.0396 6 24.5911V25.7275C6 26.9826 7.01753 28.0002 8.27273 28.0002H24.1818C25.437 28.0002 26.4545 26.9826 26.4545 25.7275V24.5911C26.4545 22.0396 25.5202 19.7063 23.975 17.9147Z" fill={focused ? '#4830FF' : tintColor} />
                    </Svg>
                    :
                    <View style={{
                        width: 32,
                        height: 32,
                        borderColor: tintColor,
                        borderWidth: 2,
                        backgroundColor: 'transparent',
                        borderRadius: 13,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}>
                        {avatarId ?
                            <LinearGradient style={{
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                }}
                                useAngle
                                {...avatarBackground}>
                                <Image style={{
                                        width: 25,
                                        height: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }} source={{
                                        uri: avatarImage
                                    }}
                                    resizeMode='stretch' />
                            </LinearGradient>
                        :
                            <View style={{
                                width: 25,
                                height: 25,
                                backgroundColor:'#FFF',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                            }}>
                                <Image style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                    source={{ uri: photoUrl }}
                                    resizeMode='cover' />
                            </View>
                        }
                    </View>
                }
                <SignUpModal open={this.state.openAuthModal}
                    onClose={() => this.setState({ openAuthModal: false })}
                    title={translate('signUpModalHeaderBar.title')}
                    benefits={[
                        translate('signUpModalHeaderBar.benefit1'),
                        translate('signUpModalHeaderBar.benefit2'),
                        translate('signUpModalHeaderBar.benefit3')
                    ]}
                    onSignUpSuccess={this.onSignUpSuccess} />
            </TouchableOpacity>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        photoUrl: state.userReducer.user.photoUrl,
        avatarBackground: state.userReducer.user.avatarBackground,
        avatarId: state.userReducer.user.avatarId
    };
}

export default connect(mapStateToProps)( withNavigation(BottomBarProfileIcon));