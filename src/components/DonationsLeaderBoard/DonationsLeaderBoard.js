import React, { Component } from 'react';
import { View, Image, FlatList } from 'react-native';

import { getDonationsLeaderBoard } from '../../services/database';
import QaplaText from '../QaplaText/QaplaText';
import { getUserProfileImgUrl } from '../../services/storage';
import styles from './styles';

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
        leaderBoard: []
    };

    componentDidMount() {
        this.loadLeaderBoard();
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

    render() {
        return (
            <FlatList
                style={styles.leaderBoardContainer}
                data={this.state.leaderBoard}
                renderItem={({ item, index }) => <LeaderRow item={item} index={index} />}
                ListHeaderComponent={() => <View style={styles.headerComponent} />}
                ItemSeparatorComponent={() => <View style={styles.separatorComponent} />}
                ListFooterComponent={() => <View style={styles.footerComponent} />} />
        );
    }
}

export default DonationsLeaderBoard;