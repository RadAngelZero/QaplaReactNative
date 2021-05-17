import React, { Component } from 'react';
import { SafeAreaView, SectionList, View } from 'react-native';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import styles from './style';
import QaplaIcon from '../../components/QaplaIcon/QaplaIcon';
import QaplaText from '../../components/QaplaText/QaplaText';
import { getUserActivityFromLast7Days } from '../../services/database';
import { translate } from '../../utilities/i18';
import { XQ, QOINS } from '../../utilities/Constants';

class ActivityScreen extends Component {
    state = {
        activity: []
    };

    componentDidMount() {
        this.loadActivity();
    }

    loadActivity = async () => {
        const activity = await getUserActivityFromLast7Days(this.props.uid);
        const activityArray = [];
        if (activity.exists()) {
            activity.forEach((activityRecord) => {
                const date = new Date(activityRecord.val().timestamp);
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
                    activityArray[activityArray.length - 1].data.push(activityRecord.val());
                } else {
                    activityArray.push({ title, data: [activityRecord.val()], indexDay: activityArray.length });
                }
            });

            activityArray.forEach((recordsOfTheDay) => {
                recordsOfTheDay.data.sort((a, b) => b.timestamp - a.timestamp);
            });

            this.setState({ activity: activityArray.reverse() });
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
                            {`${date.getHours()}:${date.getMinutes()}`} hrs
                        </QaplaText>
                    </View>
                </View>
                <QaplaText style={styles.recordAmount}>
                    {item.amount}
                </QaplaText>
            </View>
        );
    };

    closeActivityScreen = () => this.props.navigation.pop();

    render() {
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
                    sections={this.state.activity}
                    contentContainerStyle={styles.listContentContainer}
                    initialNumToRender={5}
                    renderItem={this.renderEventOnList}
                    renderSectionHeader={this.renderSectionHeader}
                    stickySectionHeadersEnabled={false}
                    ListFooterComponent={() => <View style={{ height: 30 }} />}
                    keyExtractor={(item) => item.id} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(ActivityScreen);
