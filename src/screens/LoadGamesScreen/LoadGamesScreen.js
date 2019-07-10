import React from 'react';
import { View, Text, TouchableWithoutFeedback, BackHandler } from 'react-native'
import { Svg } from 'react-native-svg';
import styles from './style'
import images from './../../../assets/images';
import VideoGamesList from '../../components/VideoGamesList/VideoGamesList';
import { connect } from 'react-redux';

const BackIcon = images.svg.backIcon;

class LoadGamesScreen extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }

    backToMatchTypeScreen = () => {
        this.props.navigation.navigate('ChooseMatchType');
        return true;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerOptions}>
                    <TouchableWithoutFeedback onPress={this.backToMatchTypeScreen}>
                        <View style={styles.backIcon}>
                            <Svg>
                                <BackIcon />
                            </Svg>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.closeIcon} onPress={this.backToMatchTypeScreen}>X</Text>
                </View>
                <VideoGamesList gamesListToLoad={this.props.userGameList} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userGameList: state.userReducer.user.gameList
    }
}

export default LoadGamesScreen = connect(mapStateToProps)(LoadGamesScreen);