import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LevelInformationModal from '../../components/LevelInformationModal/LevelInformationModal';
import { retrieveData, storeData } from '../../utilities/persistance';
import DiscoverStreamersScreen from '../DiscoverStreamersScreen/DiscoverStreamersScreen';
import FeaturedStreamsList from '../../components/FeaturedStreamsList/FeaturedStreamsList';
import StreamsList from '../../components/StreamsList/StreamsList';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';

export class TimelineStreams extends Component {
    listsToRender = [0, 1, 2, 3, 4, 5, 6];
    state = {
        openLevelInformationModal: false,
        openEventDetailsModal: false,
        selectedStream: null
    };

    componentDidMount() {
        this.checkLevelModalStatus();
    }

    checkLevelModalStatus = async () => {
        const isLevelModalViewed = await retrieveData('level-modal-viewed');
        if (!isLevelModalViewed) {
            this.setState({ openLevelInformationModal: true });
            storeData('level-modal-viewed', 'true');
        }
    }

    onStreamPress = (stream) => {
        this.setState({ selectedStream: stream }, () => this.setState({ openEventDetailsModal: true }));
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <ScrollView>
                    <FeaturedStreamsList uid={this.props.uid} onCardPress={this.onStreamPress} />
                    <View style={{ height: 40 }} />
                    <Text style={{
                        fontSize: 22,
                        fontWeight: '700',
                        lineHeight: 28,
                        letterSpacing: 1,
                        textAlign: 'left',
                        color: '#fff',
                        marginBottom: 30,
                        marginLeft: 16
                    }}>
                        Qreadores
                    </Text>
                    <DiscoverStreamersScreen
                        horizontal
                        dynamicSeparation
                        navigation={this.props.navigation} />
                    <FlatList initialNumToRender={2}
                        data={this.listsToRender}
                        keyExtractor={(item) => item.dia}
                        renderItem={({item, index}) => (
                            <StreamsList index={index}
                                onCardPress={this.onStreamPress}
                                uid={this.props.uid} />
                        )} />
                </ScrollView>
                <EventDetailsModal open={this.state.openEventDetailsModal}
                    onClose={() => this.setState({ openEventDetailsModal: false, selectedStream: null })}
                    stream={this.state.selectedStream} />
                <LevelInformationModal open={this.state.openLevelInformationModal}
                    onClose={() => this.setState({ openLevelInformationModal: false })} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(TimelineStreams);
