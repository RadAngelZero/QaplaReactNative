import React, { Component } from 'react';
import { View, Image, ScrollView, ImageBackground, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import { getDonationsLeaderBoard, getLeaderBoardPrizes } from '../../services/database';
import QaplaText from '../QaplaText/QaplaText';
import { getUserProfileImgUrl } from '../../services/storage';
import styles from './styles';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

class LeaderRow extends Component {
    state = {
        profileImage: ''
    };

    componentDidMount() {
        this.getUserImage();
    }

    getUserImage = async () => {
        const profileImage = await getUserProfileImgUrl(this.props.item.uid);

        if (profileImage) {
            this.setState({ profileImage });
        }
    }

    render() {
        return (
            <View style={styles.leaderRowContainer}>
                <Image
                    style={styles.leaderProfileImage}
                    source={{ uri: this.state.profileImage }} />
                <QaplaText style={styles.leaderPlace}>
                    {this.props.index + 1}
                </QaplaText>
                <QaplaText style={styles.totalDonations}>
                    {this.props.item.totalDonations}
                </QaplaText>
                <QaplaText style={styles.userName}>
                    {this.props.item.userName}
                </QaplaText>
            </View>
        );
    }
};

class DonationsLeaderBoard extends Component {
    state = {
        leaderBoard: [],
        leaderBoardPrizes: [],
        activePrizeIndex: 0
    };

    componentDidMount() {
        this.loadLeaderBoard();
        this.getPrizes();
    }

    loadLeaderBoard = async () => {
        const leaderBoardSnap = await getDonationsLeaderBoard();

        if (leaderBoardSnap.exists()) {
            const leaderBoardArray = Object.keys(leaderBoardSnap.val())
            .sort((a, b) => leaderBoardSnap.val()[b].totalDonations - leaderBoardSnap.val()[a].totalDonations)
            .map((uid) => {
                const leader = leaderBoardSnap.val()[uid];
                leader.uid = uid;

                return leader;
            });

            this.setState({ leaderBoard: leaderBoardArray });
        }
    }

    getPrizes = async () => {
        const leaderBoardPrizesSnap = await getLeaderBoardPrizes();

        if (leaderBoardPrizesSnap.exists()) {
            this.setState({ leaderBoardPrizes: leaderBoardPrizesSnap.val() });
        }
    }

    handleScroll = (scrollEvent) => this.setState({ activePrizeIndex: Math.round(scrollEvent.nativeEvent.contentOffset.x / widthPercentageToPx(95)) });

    render() {
        return (
            <>
                {this.state.leaderBoardPrizes &&
                    <View style={styles.prizesCard}>
                        <LinearGradient
                            useAngle={true}
                            angle={150}
                            angleCenter={{ x: .5, y: .5}}
                            colors={[
                                this.state.leaderBoardPrizes[this.state.activePrizeIndex] ? this.state.leaderBoardPrizes[this.state.activePrizeIndex].backgroundColors.primaryColor : '#2916EE',
                                this.state.leaderBoardPrizes[this.state.activePrizeIndex] ? this.state.leaderBoardPrizes[this.state.activePrizeIndex].backgroundColors.secondaryColor : '#2916EE'
                            ]}
                            style={styles.prizesContainer}>
                            {!this.props.enableScroll &&
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                scrollEventThrottle={10}
                                onScroll={this.handleScroll}>
                                {this.state.leaderBoardPrizes.map((prize) => (
                                    <ImageBackground
                                        source={{ uri: prize.backgroundImage }}
                                        style={styles.backgroundImage}>
                                        <QaplaText style={styles.prizeTitle} numberOfLines={2}>
                                            {prize.title}
                                        </QaplaText>
                                        <QaplaText style={styles.prizeDescription} numberOfLines={2}>
                                            {prize.description}
                                        </QaplaText>
                                    </ImageBackground>
                                ))}
                            </ScrollView>
                            }
                            <View style={styles.prizesCounterContainer}>
                                {Object.keys(this.state.leaderBoardPrizes).map((prizeKey, index) => (
                                    <View style={this.state.activePrizeIndex === index ? styles.prizeIndexActive : styles.prizeIndex} />
                                ))}
                            </View>
                        </LinearGradient>
                    </View>
                }
                <FlatList
                    scrollEnabled={this.props.enableScroll}
                    style={styles.leaderBoardContainer}
                    data={this.state.leaderBoard}
                    renderItem={({ item, index }) => <LeaderRow item={item} index={index} />}
                    ListHeaderComponent={() => <View style={styles.headerComponent} />}
                    ItemSeparatorComponent={() => <View style={styles.separatorComponent} />}
                    ListFooterComponent={() => <View style={styles.footerComponent} />} />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        enableScroll: state.profileLeaderBoardReducer.enableScroll
    }
}

export default connect(mapStateToProps)(DonationsLeaderBoard);