// diego           - 20-08-2019 - us89 - Show user statistics by game
//                                       Added BuyQaploinsModal
// diego           - 19-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableWithoutFeedback, ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import images from '../../../assets/images';
import UserProfilePlatformGameList from '../../components/UserProfilePlatformGameList/UserProfilePlatformGameList';
import { getUserGamesOrderedByPlatform } from '../../utilities/utils';
import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';

const QaploinExchange = images.svg.qaploinsIcon;

export class UserProfileScreen extends Component {
    state = {
        showBuyQaploinsModal: false
    };

    openBuyQaploinsModal = () => this.setState({ showBuyQaploinsModal: true });

    closeBuyQaploinsModal = () => this.setState({ showBuyQaploinsModal: false });

    render() {
        const userGames = getUserGamesOrderedByPlatform(this.props.userGames, this.props.qaplaGames);

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.userInfoContainer}>
                    <View style={styles.imageAndNameContainer}>
                        {this.props.userProfilePhoto ?
                            <Image style={styles.avatarImage} source={{ uri: this.props.userProfilePhoto }} />
                            :
                            <View style={styles.avatarImage} />
                        }
                        <Text style={styles.userName}>{this.props.userName}</Text>
                    </View>
                    <View style={styles.manageQaploinsContainer}>
                        <View style={styles.qaploinInfoContainer}>
                            <QaploinExchange style={styles.qaploinImage} />
                            <Text style={styles.qaploinsAmount}>{this.props.userQaploins}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={this.openBuyQaploinsModal}>
                            <View style={styles.addQaploinsButton}>
                                <Text style={styles.addQaploinsButtonText}>Abonar</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <ScrollView>
                    {Object.keys(userGames).map((platform, index) => (
                        <UserProfilePlatformGameList key={`${platform}-${index}`}
                            platform={platform}
                            userGames={userGames[platform]}
                            lastChild={index === Object.keys(userGames).length - 1} />
                    ))}
                </ScrollView>
                <TouchableWithoutFeedback>
                    <View style={styles.fab}>
                        <Text style={styles.fabText}>+</Text>
                    </View>
                </TouchableWithoutFeedback>
                <BuyQaploinsModal open={this.state.showBuyQaploinsModal} onClose={this.closeBuyQaploinsModal} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        userProfilePhoto: state.userReducer.user.photoUrl,
        userName: state.userReducer.user.userName,
        userQaploins: state.userReducer.user.credits,
        userGames: state.userReducer.user.gameList,
        qaplaGames: state.gamesReducer.games
    }
}

export default connect(mapStateToProps)(UserProfileScreen);
