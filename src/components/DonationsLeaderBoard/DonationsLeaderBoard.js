import React, { Component } from 'react';
import { View, Image, ScrollView, ImageBackground, FlatList, Animated, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import { getDonationsLeaderBoard, getLeaderBoardPrizes, getUserDonationLeaderBoard } from '../../services/database';
import QaplaText from '../QaplaText/QaplaText';
import { getUserProfileImgUrl } from '../../services/storage';
import styles from './styles';
import { widthPercentageToPx, heightPercentageToPx } from '../../utilities/iosAndroidDim';
import { defaultUserImages } from '../../utilities/Constants';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

class TopLeaderChip extends Component {
    render() {
        return (
            <LinearGradient
                useAngle
                angleCenter={{ x: .5, y: .5 }}
                style={styles.chipContainer}
                colors={[ this.props.primaryColor, this.props.secondaryColor ]}>
                <QaplaText style={styles.chipText}>
                    {this.props.children}
                </QaplaText>
            </LinearGradient>
        );
    }
}

class TopLeaders extends Component {
    state = {
        topLeadersImages: []
    };

    componentDidUpdate(prevProps) {
        if (this.props.topLeaders.length > prevProps.topLeaders.length) {
            this.getUserImage();
        }
    }

    getUserImage = async () => {
        const topLeadersImages = [];
        for (let i = 0; i < this.props.topLeaders.length; i++) {
            if (this.props.topLeaders[i]) {
                const profileImage = await getUserProfileImgUrl(this.props.topLeaders[i].uid);

                topLeadersImages.push('');
                if (profileImage) {
                    topLeadersImages[i] = { uri: true, img: profileImage};
                } else {
                    userImageIndex = Math.floor(Math.random() * defaultUserImages.length);
                    topLeadersImages[i] = { uri: false, img: defaultUserImages[userImageIndex].img };
                }
            }
        }

        this.setState({ topLeadersImages });
    }

    render() {
        return (
            <View style={styles.topLeadersContainer}>
                {this.props.topLeaders.length > 0 &&
                <>
                    {this.props.topLeaders[1] &&
                        <View style={styles.secondPlaceContainer}>
                            <View>
                                <Image
                                    source={this.state.topLeadersImages[1] ? this.state.topLeadersImages[1].uri ? { uri: this.state.topLeadersImages[1].img } : this.state.topLeadersImages[1].img : null}
                                    style={styles.secondAndThirdPlaceImage} />
                                <TopLeaderChip primaryColor={'#7D7D7D'} secondaryColor={'#E9E9E9'}>
                                    2º
                                </TopLeaderChip>
                            </View>
                            <QaplaText style={styles.topLeaderUserName}>
                                {this.props.topLeaders[1].userName}
                            </QaplaText>
                            <QaplaText style={styles.topLeaderExperience}>
                                {this.props.topLeaders[1].totalDonations}xp
                            </QaplaText>
                        </View>
                    }
                    {this.props.topLeaders[0] &&
                        <View style={styles.firstPlaceContainer}>
                            <View>
                                <Image
                                    source={this.state.topLeadersImages[0] ? this.state.topLeadersImages[0].uri ? { uri: this.state.topLeadersImages[0].img } : this.state.topLeadersImages[0].img : null}
                                    style={styles.firstPlaceImage} />
                                <TopLeaderChip primaryColor={'#FF9A35'} secondaryColor={'#FFD632'}>
                                    1º
                                </TopLeaderChip>
                            </View>
                            <QaplaText style={styles.topLeaderUserName}>
                                {this.props.topLeaders[0].userName}
                            </QaplaText>
                            <QaplaText style={styles.topLeaderExperience}>
                                {this.props.topLeaders[0].totalDonations}xp
                            </QaplaText>
                        </View>
                    }
                    {this.props.topLeaders[2] &&
                        <View style={styles.thirdPlaceContainer}>
                            <View>
                                <Image
                                    source={this.state.topLeadersImages[2] ? this.state.topLeadersImages[2].uri ? { uri: this.state.topLeadersImages[2].img } : this.state.topLeadersImages[2].img : null}
                                    style={styles.secondAndThirdPlaceImage} />
                                <TopLeaderChip primaryColor={'#C54D01'} secondaryColor={'#D1A704'}>
                                    3º
                                </TopLeaderChip>
                            </View>
                            <QaplaText style={styles.topLeaderUserName}>
                                {this.props.topLeaders[2].userName}
                            </QaplaText>
                            <QaplaText style={styles.topLeaderExperience}>
                                {this.props.topLeaders[2].totalDonations}xp
                            </QaplaText>
                        </View>
                    }
                    </>
                }
            </View>
        );
    }
}

class LeaderRow extends Component {
    state = {
        profileImage: null
    };

    componentDidMount() {
        this.getUserImage();
    }

    getUserImage = async () => {
        const img = await getUserProfileImgUrl(this.props.item.uid);
        let profileImage = {};

        if (img) {
            profileImage = { uri: true, img };
        } else {
            userImageIndex = Math.floor(Math.random() * defaultUserImages.length);
            profileImage = { uri: false, img: defaultUserImages[userImageIndex].img };
        }

        this.setState({ profileImage });
    }

    render() {
        return (
            <View style={styles.leaderRowContainer}>
                <View style={styles.leaderDataContainer}>
                    {Platform.OS !== 'android' ?
                        <QaplaText style={styles.leaderPlace}>
                            {(this.props.length - this.props.index) + 3}
                        </QaplaText>
                        :
                        <QaplaText style={styles.leaderPlace}>
                            {this.props.index + 4}
                        </QaplaText>
                    }
                    <Image
                        style={styles.leaderProfileImage}
                        source={this.state.profileImage ? this.state.profileImage.uri ? { uri: this.state.profileImage.img } : this.state.profileImage.img : null} />
                    <QaplaText style={styles.userName} multiline numberOfLines={1}>
                        {this.props.item.userName}
                    </QaplaText>
                </View>
                <View style={styles.leaderDonationsContainer}>
                    <QaplaText style={styles.totalDonations}>
                        {this.props.item.totalDonations}xp
                    </QaplaText>
                </View>
            </View>
        );
    }
};

const leaderBoardPrizesCardHeight = heightPercentageToPx(100) / (heightPercentageToPx(100) > 850 ? 6 : 5);

class DonationsLeaderBoard extends Component {
    onEndReachedCalledDuringMomentum = true;
    state = {
        userLeaderBoardData: {},
        topLeaders: [],
        leaderBoard: [],
        leaderBoardPrizes: [],
        activePrizeIndex: 0,
        animatedX: new Animated.Value(0),
        primaryColor: 0,
        secondaryColor: 0,
        baseWidth: widthPercentageToPx(95),
        lastIndex: 0,
        leaderBoardPrizesHeight: new Animated.Value(leaderBoardPrizesCardHeight)
    };

    componentDidMount() {
        this.loadLeaderBoard();
        this.getPrizes();
    }

    componentDidUpdate(prevProps) {
        if(this.props.enableScroll != prevProps.enableScroll) {
            Animated.timing(this.state.leaderBoardPrizesHeight, {
                toValue: this.props.enableScroll ? 0 : leaderBoardPrizesCardHeight,
                duration: 375
            }).start();
        }
    }

    loadLeaderBoard = async () => {
        const userLeaderBoardData = await getUserDonationLeaderBoard(this.props.uid);

        if (userLeaderBoardData.exists()) {
            this.setState({ userLeaderBoardData: userLeaderBoardData.val() });
        } else {
            this.setState({ userLeaderBoardData: { userName: this.props.userName, totalDonations: 0 } });
        }

        const leaderBoardSnap = await getDonationsLeaderBoard(10);

        if (leaderBoardSnap.exists()) {
            const leaderBoardArray = Object.keys(leaderBoardSnap.val())
            .sort((a, b) => leaderBoardSnap.val()[b].totalDonations - leaderBoardSnap.val()[a].totalDonations)
            .map((uid) => {
                const leader = leaderBoardSnap.val()[uid];
                leader.uid = uid;

                return leader;
            });

            this.setState({
                topLeaders: [
                    leaderBoardArray[0] ? leaderBoardArray[0] : null,
                    leaderBoardArray[1] ? leaderBoardArray[1] : null,
                    leaderBoardArray[2] ? leaderBoardArray[2] : null,
                ]
            });

            leaderBoardArray.shift();
            leaderBoardArray.shift();
            leaderBoardArray.shift();

            this.setState({ leaderBoard: Platform.OS !== 'android' ? leaderBoardArray.reverse() : leaderBoardArray }, () => {
                if (Platform.OS !== 'android') {
                    setTimeout(() => {
                        if (this.flatListRef) {
                            this.flatListRef.scrollToEnd();
                        }
                    }, 750);
                }
            });
        }
    }

    getPrizes = async () => {
        const leaderBoardPrizesSnap = await getLeaderBoardPrizes();

        if (leaderBoardPrizesSnap.exists()) {
            this.setState({
                leaderBoardPrizes: leaderBoardPrizesSnap.val(),
                primaryColor: leaderBoardPrizesSnap.val()[0].backgroundColors.primaryColor,
                secondaryColor: leaderBoardPrizesSnap.val()[0].backgroundColors.secondaryColor,
            });
        }
    }

    handleScroll = (scrollEvent) => {
        Animated.event([{
            nativeEvent: {
                contentOffset: {
                    x: this.state.animatedX
                }
            }
        }],
        {
            listener: scrollEvent => {
                var percentage = (scrollEvent.nativeEvent.contentOffset.x - (widthPercentageToPx(95) * this.state.lastIndex)) / (widthPercentageToPx(95))

                var primaryCurrColor = this.state.leaderBoardPrizes[this.state.lastIndex] != undefined ? this.state.leaderBoardPrizes[this.state.lastIndex].backgroundColors.primaryColor.slice(1) : 'dddddd'
                var primaryCurrR = parseInt(primaryCurrColor.slice(0, 2), 16)
                var primaryCurrG = parseInt(primaryCurrColor.slice(2, 4), 16)
                var primaryCurrB = parseInt(primaryCurrColor.slice(4, 6), 16)

                var primaryNextColor = this.state.leaderBoardPrizes[this.state.lastIndex + 1] != undefined ? this.state.leaderBoardPrizes[this.state.lastIndex + 1].backgroundColors.primaryColor.slice(1) : this.state.leaderBoardPrizes[this.state.lastIndex].backgroundColors.primaryColor.slice(1)
                var primaryNextR = parseInt(primaryNextColor.slice(0, 2), 16)
                var primaryNextG = parseInt(primaryNextColor.slice(2, 4), 16)
                var primaryNextB = parseInt(primaryNextColor.slice(4, 6), 16)

                var primaryPrevColor = this.state.leaderBoardPrizes[this.state.lastIndex - 1] != undefined ? this.state.leaderBoardPrizes[this.state.lastIndex - 1].backgroundColors.primaryColor.slice(1) : this.state.leaderBoardPrizes[this.state.lastIndex].backgroundColors.primaryColor.slice(1)
                var primaryPrevR = parseInt(primaryPrevColor.slice(0, 2), 16)
                var primaryPrevG = parseInt(primaryPrevColor.slice(2, 4), 16)
                var primaryPrevB = parseInt(primaryPrevColor.slice(4, 6), 16)

                var secondaryCurrColor = this.state.leaderBoardPrizes[this.state.lastIndex] != undefined ? this.state.leaderBoardPrizes[this.state.lastIndex].backgroundColors.secondaryColor.slice(1) : 'dddddd'
                var secondaryCurrR = parseInt(secondaryCurrColor.slice(0, 2), 16)
                var secondaryCurrG = parseInt(secondaryCurrColor.slice(2, 4), 16)
                var secondaryCurrB = parseInt(secondaryCurrColor.slice(4, 6), 16)

                var secondaryNextColor = this.state.leaderBoardPrizes[this.state.lastIndex + 1] != undefined ? this.state.leaderBoardPrizes[this.state.lastIndex + 1].backgroundColors.secondaryColor.slice(1) : this.state.leaderBoardPrizes[this.state.lastIndex].backgroundColors.secondaryColor.slice(1)
                var secondaryNextR = parseInt(secondaryNextColor.slice(0, 2), 16)
                var secondaryNextG = parseInt(secondaryNextColor.slice(2, 4), 16)
                var secondaryNextB = parseInt(secondaryNextColor.slice(4, 6), 16)

                var secondaryPrevColor = this.state.leaderBoardPrizes[this.state.lastIndex - 1] != undefined ? this.state.leaderBoardPrizes[this.state.lastIndex - 1].backgroundColors.secondaryColor.slice(1) : this.state.leaderBoardPrizes[this.state.lastIndex].backgroundColors.secondaryColor.slice(1)
                var secondaryPrevR = parseInt(secondaryPrevColor.slice(0, 2), 16)
                var secondaryPrevG = parseInt(secondaryPrevColor.slice(2, 4), 16)
                var secondaryPrevB = parseInt(secondaryPrevColor.slice(4, 6), 16)

                var primaryColorHex = `#ffffff`
                var secondaryColorHex = `#ffffff`

                if (percentage > 0) {
                    var primaryRDifference = primaryCurrR > primaryNextR ? primaryCurrR - primaryNextR : primaryNextR - primaryCurrR
                    var primaryGDifference = primaryCurrG > primaryNextG ? primaryCurrG - primaryNextG : primaryNextG - primaryCurrG
                    var primaryBDifference = primaryCurrB > primaryNextB ? primaryCurrB - primaryNextB : primaryNextB - primaryCurrB

                    var primaryR = primaryCurrR > primaryNextR ? Math.round(primaryCurrR - (primaryRDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(primaryCurrR + (primaryRDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))
                    var primaryG = primaryCurrG > primaryNextG ? Math.round(primaryCurrG - (primaryGDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(primaryCurrG + (primaryGDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))
                    var primaryB = primaryCurrB > primaryNextB ? Math.round(primaryCurrB - (primaryBDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(primaryCurrB + (primaryBDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))

                    var primaryRHex = primaryR.toString(16).length < 2 ? '0' + primaryR.toString(16) : primaryR.toString(16)
                    var primaryGHex = primaryG.toString(16).length < 2 ? '0' + primaryG.toString(16) : primaryG.toString(16)
                    var primaryBHex = primaryB.toString(16).length < 2 ? '0' + primaryB.toString(16) : primaryB.toString(16)

                    primaryColorHex = `#${primaryRHex}${primaryGHex}${primaryBHex}`

                    var secondaryRDifference = secondaryCurrR > secondaryNextR ? secondaryCurrR - secondaryNextR : secondaryNextR - secondaryCurrR
                    var secondaryGDifference = secondaryCurrG > secondaryNextG ? secondaryCurrG - secondaryNextG : secondaryNextG - secondaryCurrG
                    var secondaryBDifference = secondaryCurrB > secondaryNextB ? secondaryCurrB - secondaryNextB : secondaryNextB - secondaryCurrB

                    var secondaryR = secondaryCurrR > secondaryNextR ? Math.round(secondaryCurrR - (secondaryRDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(secondaryCurrR + (secondaryRDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))
                    var secondaryG = secondaryCurrG > secondaryNextG ? Math.round(secondaryCurrG - (secondaryGDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(secondaryCurrG + (secondaryGDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))
                    var secondaryB = secondaryCurrB > secondaryNextB ? Math.round(secondaryCurrB - (secondaryBDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(secondaryCurrB + (secondaryBDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))

                    var secondaryRHex = secondaryR.toString(16).length < 2 ? '0' + secondaryR.toString(16) : secondaryR.toString(16)
                    var secondaryGHex = secondaryG.toString(16).length < 2 ? '0' + secondaryG.toString(16) : secondaryG.toString(16)
                    var secondaryBHex = secondaryB.toString(16).length < 2 ? '0' + secondaryB.toString(16) : secondaryB.toString(16)

                    secondaryColorHex = `#${secondaryRHex}${secondaryGHex}${secondaryBHex}`
                } else {

                    var primaryRDifference = primaryCurrR > primaryPrevR ? primaryCurrR - primaryPrevR : primaryPrevR - primaryCurrR
                    var primaryGDifference = primaryCurrG > primaryPrevG ? primaryCurrG - primaryPrevG : primaryPrevG - primaryCurrG
                    var primaryBDifference = primaryCurrB > primaryPrevB ? primaryCurrB - primaryPrevB : primaryPrevB - primaryCurrB

                    var primaryR = primaryCurrR > primaryPrevR ? Math.round(primaryCurrR - (primaryRDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(primaryCurrR + (primaryRDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))
                    var primaryG = primaryCurrG > primaryPrevG ? Math.round(primaryCurrG - (primaryGDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(primaryCurrG + (primaryGDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))
                    var primaryB = primaryCurrB > primaryPrevB ? Math.round(primaryCurrB - (primaryBDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(primaryCurrB + (primaryBDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))

                    var primaryRHex = primaryR.toString(16).length < 2 ? '0' + primaryR.toString(16) : primaryR.toString(16)
                    var primaryGHex = primaryG.toString(16).length < 2 ? '0' + primaryG.toString(16) : primaryG.toString(16)
                    var primaryBHex = primaryB.toString(16).length < 2 ? '0' + primaryB.toString(16) : primaryB.toString(16)

                    primaryColorHex = `#${primaryRHex}${primaryGHex}${primaryBHex}`

                    var secondaryRDifference = secondaryCurrR > secondaryPrevR ? secondaryCurrR - secondaryPrevR : secondaryPrevR - secondaryCurrR
                    var secondaryGDifference = secondaryCurrG > secondaryPrevG ? secondaryCurrG - secondaryPrevG : secondaryPrevG - secondaryCurrG
                    var secondaryBDifference = secondaryCurrB > secondaryPrevB ? secondaryCurrB - secondaryPrevB : secondaryPrevB - secondaryCurrB

                    var secondaryR = secondaryCurrR > secondaryPrevR ? Math.round(secondaryCurrR - (secondaryRDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(secondaryCurrR + (secondaryRDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))
                    var secondaryG = secondaryCurrG > secondaryPrevG ? Math.round(secondaryCurrG - (secondaryGDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(secondaryCurrG + (secondaryGDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))
                    var secondaryB = secondaryCurrB > secondaryPrevB ? Math.round(secondaryCurrB - (secondaryBDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage)))) : Math.round(secondaryCurrB + (secondaryBDifference * (Math.abs(percentage) > 1 ? 1 : Math.abs(percentage))))

                    var secondaryRHex = secondaryR.toString(16).length < 2 ? '0' + secondaryR.toString(16) : secondaryR.toString(16)
                    var secondaryGHex = secondaryG.toString(16).length < 2 ? '0' + secondaryG.toString(16) : secondaryG.toString(16)
                    var secondaryBHex = secondaryB.toString(16).length < 2 ? '0' + secondaryB.toString(16) : secondaryB.toString(16)

                    secondaryColorHex = `#${secondaryRHex}${secondaryGHex}${secondaryBHex}`

                }

                this.setState({ primaryColor: primaryColorHex, secondaryColor: secondaryColorHex })
            },
            useNativeDriver: false
        }
        )(scrollEvent);

        this.setState({ activePrizeIndex: Math.round(scrollEvent.nativeEvent.contentOffset.x / widthPercentageToPx(95)) });
    }

    handleEndMomentum = (endMomentumEvent) => this.setState({ lastIndex: Math.round(endMomentumEvent.nativeEvent.contentOffset.x / widthPercentageToPx(95)) })

    loadMoreLeaders = async () => {
        if (!this.onEndReachedCalledDuringMomentum) {
            if (this.state.leaderBoard.length < 97) {
                    const leaderBoardSnap = await getDonationsLeaderBoard(this.state.leaderBoard.length + 10);

                if (leaderBoardSnap.exists()) {
                    const leaderBoardArray = Object.keys(leaderBoardSnap.val())
                    .sort((a, b) => leaderBoardSnap.val()[b].totalDonations - leaderBoardSnap.val()[a].totalDonations)
                    .map((uid) => {
                        const leader = leaderBoardSnap.val()[uid];
                        leader.uid = uid;

                        return leader;
                    });

                    this.setState({
                        topLeaders: [
                            leaderBoardArray[0] ? leaderBoardArray[0] : null,
                            leaderBoardArray[1] ? leaderBoardArray[1] : null,
                            leaderBoardArray[2] ? leaderBoardArray[2] : null,
                        ]
                    });

                    leaderBoardArray.shift();
                    leaderBoardArray.shift();
                    leaderBoardArray.shift();

                    this.setState({ leaderBoard: Platform.OS !== 'android' ? leaderBoardArray.reverse() : leaderBoardArray });
                }
                this.onEndReachedCalledDuringMomentum = true;
            }
        }
    }

    render() {
        return (
            <>
                {this.state.leaderBoardPrizes &&
                    <Animated.View style={[styles.prizesCard, { height: this.state.leaderBoardPrizesHeight }]}>
                        <AnimatedLinearGradient
                            useAngle={true}
                            angle={150}
                            angleCenter={{ x: .5, y: .5}}
                            colors={[
                                this.state.primaryColor,
                                this.state.secondaryColor
                            ]}
                            style={styles.prizesContainer}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                onScroll={this.handleScroll}
                                onScrollEndDrag={this.handleEndMomentum}
                                scrollEventThrottle={10}>
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
                            <View style={styles.prizesCounterContainer}>
                                {Object.keys(this.state.leaderBoardPrizes).map((prizeKey, index) => (
                                    <View style={this.state.activePrizeIndex === index ? styles.prizeIndexActive : styles.prizeIndex} />
                                ))}
                            </View>
                        </AnimatedLinearGradient>
                    </Animated.View>
                }
                {this.state.leaderBoard &&
                    <TopLeaders topLeaders={this.state.topLeaders} />
                }
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={(flatList) => this.flatListRef = flatList}
                        nestedScrollEnabled
                        inverted={Platform.OS !== 'android'}
                        scrollEnabled={this.props.enableScroll}
                        style={styles.leaderBoardContainer}
                        data={this.state.leaderBoard}
                        keyExtractor={(item) => `leader-${item.uid}`}
                        onEndReached={this.loadMoreLeaders}
                        onEndReachedThreshold={.5}
                        onScroll={() => this.onEndReachedCalledDuringMomentum = false}
                        renderItem={({ item, index }) => <LeaderRow length={this.state.leaderBoard.length} item={item} index={index} />}
                        ItemSeparatorComponent={() => <View style={styles.separatorComponent} />} />
                </View>
                <View style={styles.userLeaderBoardPositionContainer}>
                    <View style={styles.dataContainer}>
                        <Image
                            style={styles.userLeaderImage}
                            source={this.props.userImage ? this.props.userImage.uri ? { uri: this.props.userImage.img } : this.props.userImage.img : null} />
                        <QaplaText style={styles.userLeaderName} multiline numberOfLines={1}>
                            {this.state.userLeaderBoardData.userName}
                        </QaplaText>
                    </View>
                    <QaplaText style={styles.userLeaderDonations}>
                        {this.state.userLeaderBoardData.totalDonations}xp
                    </QaplaText>
                </View>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName,
        enableScroll: state.profileLeaderBoardReducer.enableScroll,
        userImage: state.profileLeaderBoardReducer.userImage
    }
}

export default connect(mapStateToProps)(DonationsLeaderBoard);