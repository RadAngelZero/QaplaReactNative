import React, { Component } from 'react';
import { SafeAreaView, SectionList, View } from 'react-native';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import styles from './style';
import QaplaIcon from '../../components/QaplaIcon/QaplaIcon';
import QaplaText from '../../components/QaplaText/QaplaText';
import { translate } from '../../utilities/i18';
import { XQ, QOINS } from '../../utilities/Constants';
import { setActivityRecordsAsRead } from '../../services/database';

class ActivityScreen extends Component {
    state = {
        activity: []
    };

    loadActivity = () => {
        const activityArray = [];
        const unreadRecordsArray = [];
        if (this.props.activity) {
            Object.keys(this.props.activity)
            .sort((a, b) => this.props.activity[b].timestamp - this.props.activity[a].timestamp)
            .forEach((activityRecord) => {
                if (!this.props.activity[activityRecord].hasOwnProperty('read')) {
                    unreadRecordsArray.push(activityRecord);
                }
                const date = new Date(this.props.activity[activityRecord].timestamp);
                const today = new Date();
                const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                const title = today.getDate() === date.getDate() ?
                    translate('days.today')
                    :
                    today.getDate() - 1 === date.getDate() ?
                        translate('days.yesterday')
                        :
                        translate(`days.${days[date.getDay()]}`);
                if (activityArray.some((activityOfTheDay) => activityOfTheDay.title === title)) {
                    activityArray[activityArray.length - 1].data.push(this.props.activity[activityRecord]);
                } else {
                    activityArray.push({ title, data: [this.props.activity[activityRecord]] });
                }
            });

            activityArray.forEach((recordsOfTheDay) => {
                recordsOfTheDay.data.sort((a, b) => b.timestamp - a.timestamp);
            });

            setActivityRecordsAsRead(this.props.uid, unreadRecordsArray);

            return activityArray;
        }
    }

    renderSectionHeader = ({ section: { title } }) => <QaplaText style={styles.sectionHeader}>{title}</QaplaText>;

    renderEventOnList = ({ item, index }) => {
        const date = new Date(item.timestamp);
        return (
            <View style={[styles.recordContainer, { marginTop: index === 0 ? 24 : 48 }]}>
                <View style={styles.recordLeftPartContainer}>
                    <QaplaIcon>
                        {item.type === XQ ?
                            <images.svg.activityXQ />
                        :
                            <images.svg.activityQoin />
                        }
                    </QaplaIcon>
                    <View style={styles.recordDetailContainer}>
                        <QaplaText style={styles.recordTitle}>
                            {translate(`activityScreen.${item.type === XQ ? XQ : QOINS}`, { streamerName: item.streamerName })}
                        </QaplaText>
                        <QaplaText style={styles.recordHours}>
                            {`${this.addZeroToNumberLowerThan10(date.getHours())}:${this.addZeroToNumberLowerThan10(date.getMinutes())}`} hrs
                        </QaplaText>
                    </View>
                </View>
                <QaplaText style={styles.recordAmount}>
                    {item.amount}
                </QaplaText>
            </View>
        );
    };

    addZeroToNumberLowerThan10 = (number) => number < 10 ? `0${number}`: number;

    closeActivityScreen = () => this.props.navigation.pop();

    render() {
        const activity = this.loadActivity();
        return (
            <SafeAreaView style={styles.container}>
                <QaplaIcon
                    touchableStyle={styles.backIcon}
                    onPress={this.closeActivityScreen}>
                    <images.svg.closeThiccIcon />
                </QaplaIcon>
                <QaplaText style={styles.title}>
                    {translate('activityScreen.activity')}
                </QaplaText>
                <SectionList
                    sections={activity}
                    contentContainerStyle={styles.listContentContainer}
                    initialNumToRender={5}
                    renderItem={this.renderEventOnList}
                    renderSectionHeader={this.renderSectionHeader}
                    stickySectionHeadersEnabled={false}
                    ListFooterComponent={() => <View style={{ height: 30 }} />}
                    keyExtractor={(item) => item.timestamp + item.streamerName + item.type} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        activity: state.userReducer.user.activity
    }
}

export default connect(mapStateToProps)(ActivityScreen);
