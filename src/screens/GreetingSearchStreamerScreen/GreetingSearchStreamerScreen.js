import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { getRandomStreamerOfflineGif, getStreamersByName, getUserGreetingData, writeStreamGreeting } from '../../services/database';
import { TWITCH_AFFILIATE, TWITCH_PARTNER } from '../../utilities/Constants';
import { getLocaleLanguage, translate } from '../../utilities/i18';
import { connect } from 'react-redux';
import { getUserToStreamerRelationData } from '../../services/functions';
import ModalWithOverlay from '../../components/ModalWithOverlay/ModalWithOverlay';

const Item = ({ streamerName, streamerImg, isStreaming, streamerId, onPress }) => (
    <TouchableOpacity onPress={() => onPress(streamerId, streamerName, isStreaming)}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingVertical: 14,
            }}>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                    }}
                    source={{
                        uri: streamerImg,
                    }} />
                <View style={{ width: 14 }} />
                <Text style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '500',
                    lineHeight: 20,
                    letterSpacing: 0.5,
                }}>{streamerName}</Text>
                {isStreaming &&
                    <View style={{
                        width: 12,
                        height: 12,
                        backgroundColor: '#FF006B',
                        borderRadius: 6,
                        marginLeft: 6,
                    }} />
                }
            </View>
            {isStreaming &&
                <TouchableOpacity onPress={() => onPress(streamerId, streamerName, isStreaming)}
                    style={{ backgroundColor: '#3B4BF9', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', letterSpacing: .5, color: '#FFF' }}>
                        {translate('greetingSearchStreamerScreen.sayHi')}
                    </Text>
                </TouchableOpacity>
            }
    </TouchableOpacity>
);

class GreetingSearchStreamerScreen extends Component {
    state = {
        search: '',
        searchResults: {},
        openConfirmationModal: false,
        openSentModal: false,
        openStreamerOfflineModal: false,
        openNotASubModal: false,
        openGreetingAlreadySentModal: false,
        selectedStreamer: {
            uid: '',
            displayName: ''
        },
        userToStreamerRelationData: {
            streamerUid: '',
            isSubscribed: undefined
        },
        userWantToSendGreeting: false,
        fallbackGifUrl: ''
    };

    componentDidMount() {
        this.getFallbackGif();
    }

    componentDidUpdate() {
        // If the user want to send the greeting and the isSubscribed promise is solved
        if (this.state.userWantToSendGreeting && this.state.userToStreamerRelationData.isSubscribed !== undefined) {
            this.sendGreeting();
        }
    }

    getFallbackGif = async () => {
        const gif = await getRandomStreamerOfflineGif();
        this.setState({ fallbackGifUrl: gif.val() });
    }

    searchHandler = (search) => {
        clearTimeout(this.searchTimeout);
        this.setState({ search, searchResults: [] });
        if (search !== '') {
            this.searchTimeout = setTimeout(async () => {
                const streamers = await getStreamersByName(search);
                if (streamers.exists()) {
                    this.setState({ searchResults: streamers.val() });
                }
            }, 250);
        }
    }

    renderItem = ({ item, index }) => {
        if (item.broadcasterType === TWITCH_PARTNER || item.broadcasterType === TWITCH_AFFILIATE) {
            return (
                <Item index={index}
                    streamerName={item.displayName}
                    streamerImg={item.photoUrl}
                    isStreaming={item.isStreaming}
                    streamerId={item.streamerId}
                    onPress={this.onStreamerSelected} />
            );
        }

        return null;
    }

    onStreamerSelected = (streamerId, displayName, isStreaming) => {
        if (isStreaming) {
            this.setState({
                openConfirmationModal: true,
                selectedStreamer: { uid: streamerId, displayName }
                }, () => {
                    /**
                     * Here we don´t want to block the process while the cloud functions gives us an answer, so we don´t use
                     * await, we use then so whenever the promise is solved we set the value in the state
                     */
                    const relationDataPromise = getUserToStreamerRelationData(this.props.twitchId, streamerId);
                    relationDataPromise.then((relation) => {
                        this.setState({
                            userToStreamerRelationData: { streamerUid: streamerId, isSubscribed: relation.data.isSubscribed }
                        });
                    });
                }
            );
        } else {
            this.setState({ openStreamerOfflineModal: true, selectedStreamer: { uid: streamerId, displayName } });
        }
    }

    sendGreeting = async () => {
        /**
         * We check if the user subscription check has been resolved and if the uid´s of the streamers is the same in
         * userToStreamerRelationData and selectedStreamer. We do this because as we load asynchronously the data of
         * userToStreamerRelationData it can lead to false positives or false negativs when checking user subscription
         */
        if (this.state.userToStreamerRelationData.isSubscribed !== undefined
            &&
            this.state.userToStreamerRelationData.streamerUid === this.state.selectedStreamer.uid) {
            const userGreetingData = await getUserGreetingData(this.props.uid);
            if (userGreetingData.exists()) {
                // We already know it is not undefined but we need to know if it is true
                if (this.state.userToStreamerRelationData.isSubscribed) {
                    const { animation: { animationId }, TTS: { message } } = userGreetingData.val();
                    const language = getLocaleLanguage();

                    try {
                        await writeStreamGreeting(
                            this.props.uid,
                            /**
                             * Use this uid, so even if we made a mistake the user can only send greetings to streamers
                             * he is actually subscribed to
                             */
                            this.state.userToStreamerRelationData.streamerUid,
                            this.props.avatarId,
                            animationId,
                            message,
                            this.props.twitchUsername,
                            language
                        );

                        this.setState({ userWantToSendGreeting: false, openSentModal: true, openConfirmationModal: false });
                    } catch (error) {
                        this.setState({ userWantToSendGreeting: false, openConfirmationModal: false, openGreetingAlreadySentModal: true });
                    }
                } else {
                    this.setState({ userWantToSendGreeting: false, openConfirmationModal: false, openNotASubModal: true });
                }
            }
        } else {
            // To prevent an infinite loop of updates because of componentDidUpdate we validate this
            if (!this.state.userWantToSendGreeting) {
                this.setState({ userWantToSendGreeting: true });
            }
        }
    }

    closeModalsAndGoToProfile = () => {
        this.setState({
            openConfirmationModal: false,
            openStreamerOfflineModal: false,
            openNotASubModal: false,
            openSentModal: false,
            openGreetingAlreadySentModal: false
        }, () => {
            this.exitProcess();
        });
    }

    followStreamer = () => {
        this.setState({ openConfirmationModal: false, openStreamerOfflineModal: false }, () => {
            this.props.navigation.navigate('StreamerProfile', { streamerId: this.state.selectedStreamer.uid })
        });
    }

    openSelectedStreamerTwitchChannel = () => {
        Linking.openURL(`https://twitch.tv/${this.state.selectedStreamer.displayName.toLowerCase()}`);
    }

    exitProcess = () => {
        this.props.navigation.dismiss();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.searchBarContainer}>
                        <TouchableOpacity onPress={this.exitProcess}>
                            <images.svg.backIcon />
                        </TouchableOpacity>
                        <View style={[styles.searchBar, styles.streamerSearchBar]}>
                            <View style={{ opacity: 0.4 }}>
                                <images.svg.searchStreamerIcon style={styles.searchIcon} />
                            </View>
                            <TextInput autoFocus
                                placeholder={translate('greetingSearchStreamerScreen.searchStreamer')}
                                placeholderTextColor='rgba(255, 255, 255, .4)'
                                style={styles.gridSearchBarTextInput}
                                value={this.state.search}
                                onChangeText={(this.searchHandler)} />
                        </View>
                    </View>
                    <FlatList
                        style={styles.resultsList}
                        data={Object.keys(this.state.searchResults).map((streamerId) => ({ streamerId, ...this.state.searchResults[streamerId] }))}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps={'always'} />
                </View>

                {/* Confirmation Modal */}
                <ModalWithOverlay open={this.state.openConfirmationModal}
                    onClose={() => this.setState({ openConfirmationModal: false })}>
                    {!this.state.userWantToSendGreeting ?
                        <Text style={styles.modalsTitle}>
                            {translate('greetingSearchStreamerScreen.confirmationModal.titleP1')}
                            <Text style={{ color: '#00FFDD' }}>
                                {translate('greetingSearchStreamerScreen.confirmationModal.streamerName', { streamerName: this.state.selectedStreamer.displayName })}
                            </Text>
                            {translate('greetingSearchStreamerScreen.confirmationModal.titleP2')}
                        </Text>
                        :
                        <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                    }
                    <TouchableOpacity style={[styles.modalButton, {
                            opacity: !this.state.userWantToSendGreeting ? 1 : .4
                        }]}
                        disabled={this.state.userWantToSendGreeting}
                        onPress={this.sendGreeting}>
                        <Text style={styles.modalButtonText}>
                            {translate('greetingSearchStreamerScreen.confirmationModal.sendAviNow')}
                        </Text>
                    </TouchableOpacity>
                </ModalWithOverlay>

                {/* Streamer Offline Modal */}
                <ModalWithOverlay open={this.state.openStreamerOfflineModal}
                    onClose={this.closeModalsAndGoToProfile}>
                    <Image style={styles.streamerOfflineImage}
                        source={{ uri: this.state.fallbackGifUrl }} />
                    <Text style={[styles.modalsTitle, { marginTop: 32 }]}>
                        {translate('greetingSearchStreamerScreen.streamerOfflineModal.title')}
                    </Text>
                    <Text style={styles.modalsDescriptions}>
                        {translate('greetingSearchStreamerScreen.streamerOfflineModal.descriptionP1')}
                        <Text style={{ color: '#00FFDD' }}>
                            {translate('greetingSearchStreamerScreen.streamerOfflineModal.streamerName', { streamerName: this.state.selectedStreamer.displayName })}
                        </Text>
                        {translate('greetingSearchStreamerScreen.streamerOfflineModal.descriptionP2')}
                    </Text>
                    <TouchableOpacity style={styles.modalButton}
                        onPress={this.followStreamer}>
                        <Text style={styles.modalButtonText}>
                            {translate('greetingSearchStreamerScreen.streamerOfflineModal.follow')}
                        </Text>
                    </TouchableOpacity>
                </ModalWithOverlay>

                {/* Not a Sub Modal */}
                <ModalWithOverlay open={this.state.openNotASubModal}
                    onClose={this.closeModalsAndGoToProfile}>
                    <Image style={styles.streamerOfflineImage}
                        source={{ uri: this.state.fallbackGifUrl }} />
                    <Text style={[styles.modalsTitle, { marginTop: 32 }]}>
                        {translate('greetingSearchStreamerScreen.notASubModal.title')}
                    </Text>
                    <Text style={styles.modalsDescriptions}>
                        {translate('greetingSearchStreamerScreen.notASubModal.descriptionP1')}
                        <Text style={{ color: '#00FFDD' }}>
                            {translate('greetingSearchStreamerScreen.notASubModal.descriptionP2')}
                        </Text>
                    </Text>
                    <TouchableOpacity style={styles.modalButton}
                        onPress={this.openSelectedStreamerTwitchChannel}>
                        <Text style={styles.modalButtonText}>
                            {translate('greetingSearchStreamerScreen.notASubModal.subscribe')}
                        </Text>
                    </TouchableOpacity>
                </ModalWithOverlay>

                {/* Greeting Already sent Modal */}
                <ModalWithOverlay open={this.state.openGreetingAlreadySentModal}
                    onClose={this.closeModalsAndGoToProfile}>
                    <Image source={images.png.warningCircle.img} />
                    <Text style={[styles.modalsTitle, { marginTop: 32 }]}>
                        {translate('greetingSearchStreamerScreen.greetingAlreadySentModal.title')}
                    </Text>
                    <Text style={styles.modalsDescriptions}>
                        <Text style={{ color: '#00FFDD' }}>
                            {translate('greetingSearchStreamerScreen.greetingAlreadySentModal.descriptionP1')}
                        </Text>
                        {translate('greetingSearchStreamerScreen.greetingAlreadySentModal.descriptionP2')}
                    </Text>
                    <TouchableOpacity style={styles.modalButton}
                        onPress={this.openSelectedStreamerTwitchChannel}>
                        <Text style={styles.modalButtonText}>
                            {translate('greetingSearchStreamerScreen.greetingAlreadySentModal.goToStream')}
                        </Text>
                    </TouchableOpacity>
                </ModalWithOverlay>

                {/* Sent Modal */}
                <ModalWithOverlay open={this.state.openSentModal}
                    onClose={this.closeModalsAndGoToProfile}>
                    <Image style={styles.successImage}
                        source={images.png.checkCircleGlow.img} />
                    <Text style={styles.modalsTitle}>
                        {translate('greetingSearchStreamerScreen.sentModal.title')}
                    </Text>
                    <TouchableOpacity style={styles.modalButton}
                        onPress={this.openSelectedStreamerTwitchChannel}>
                        <Text style={styles.modalButtonText}>
                            {translate('greetingSearchStreamerScreen.sentModal.goToStream')}
                        </Text>
                    </TouchableOpacity>
                </ModalWithOverlay>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        twitchId: state.userReducer.user.twitchId,
        twitchUsername: state.userReducer.user.twitchUsername,
        avatarId: state.userReducer.user.avatarId,
        previousScreen: state.screensReducer.previousScreenId
    };
}

export default connect(mapStateToProps)(GreetingSearchStreamerScreen);