import React, { Component } from 'react';
import { View, Image, ScrollView, ImageBackground, FlatList, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import { getDonationsLeaderBoard, getLeaderBoardPrizes } from '../../services/database';
import QaplaText from '../QaplaText/QaplaText';
import { getUserProfileImgUrl } from '../../services/storage';
import styles from './styles';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';
import { event } from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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
        activePrizeIndex: 0,
        animatedX: new Animated.Value(0),
        primaryColor: 0,
        secondaryColor: 0,
        baseWidth: widthPercentageToPx(95),
        lastIndex: 0
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

                console.log(scrollEvent.nativeEvent.contentOffset.x)

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

                    console.log('siguiente')
                    
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

                    console.log('anterior')

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
                console.log(primaryColorHex)
                console.log(secondaryColorHex)

                this.setState({ primaryColor: primaryColorHex, secondaryColor: secondaryColorHex })
            },
            useNativeDriver: false
        }
        )(scrollEvent)
        this.setState({ activePrizeIndex: Math.round(scrollEvent.nativeEvent.contentOffset.x / widthPercentageToPx(95)) })

    };

    handleEndMomentum = (endMomentumEvent) => {
        console.log('momentum end')
        this.setState({
            lastIndex: Math.round(endMomentumEvent.nativeEvent.contentOffset.x / widthPercentageToPx(95)),
        })
    }

    render() {
        return (
            <>
                {this.state.leaderBoardPrizes &&
                    <View style={styles.prizesCard}>
                        <AnimatedLinearGradient
                            useAngle={true}
                            angle={150}
                            angleCenter={{ x: .5, y: .5}}
                            colors={[
                                this.state.primaryColor,
                                this.state.secondaryColor
                            ]}
                            style={styles.prizesContainer}>
                            {!this.props.enableScroll &&
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
<<<<<<< HEAD
                                onScroll={this.handleScroll}
                                onMomentumScrollEnd={this.handleEndMomentum}
                                scrollEventThrottle={1}
                                >
=======
                                scrollEventThrottle={10}
                                onScroll={this.handleScroll}>
>>>>>>> f92f77dd24e5590ed41b69922808da6f685df678
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
                        </AnimatedLinearGradient>
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