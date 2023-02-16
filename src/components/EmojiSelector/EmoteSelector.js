import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    SectionList,
    ActivityIndicator,
} from 'react-native';

import images from '../../../assets/images';
import { translate } from '../../utilities/i18';

class EmoteSelector extends Component {
    renderEmote = (emote, locked) => {
        return (
            <Emote emote={emote}
                locked={locked}
                onEmoteSelect={this.props.onEmoteSelect}
                onEmoteRemoved={this.props.onEmoteRemoved} />
        );
    }

    renderEmoteSection = ({ item, section }) => {
        let locked = false;

        switch (section.key) {
            case 'follower':
                locked = !this.props.isFollower;
                break;
            case 'subTier1':
                locked = !this.props.isSubscribed;
                break;
            case 'subTier2':
                locked = !this.props.isSubscribed || this.props.subscriptionTier < 2000;
                break;
            case 'subTier3':
                locked = !this.props.isSubscribed || this.props.subscriptionTier < 3000;
                break;
            default:
                break;
        }

        return (
            <FlatList data={item}
                keyExtractor={item.id}
                renderItem={({ item }) => this.renderEmote(item, locked)}
                numColumns={5} />
        )
    };

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 16,
                alignContent: 'center',
                justifyContent: 'center'
            }}>
                {this.props.data === null &&
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFF' }}>
                        Error
                    </Text>
                }
                {this.props.data && this.props.data.length > 0 ?
                    <SectionList sections={this.props.data}
                        keyExtractor={(item) => item.key}
                        keyboardShouldPersistTaps='handled'
                        renderItem={this.renderEmoteSection}
                        renderSectionHeader={({ section: { key, data } }) => (
                            data && data[0] && data[0].length > 0 ?
                                <Text style={{
                                    fontWeight: '500',
                                    fontSize: 16,
                                    color: 'rgba(255, 255, 255, .8)',
                                    backgroundColor: '#141539',
                                    marginBottom: 8,
                                    paddingTop: 24
                                }}>
                                    {translate(`interactions.checkout.emoteModal.${key}`)}
                                </Text>
                                :
                                null
                        )} />
                    :
                    this.props.data !== null &&
                    <ActivityIndicator
                        size='large'
                        color='rgb(61, 249, 223)' />
                }
            </View>
        );
    }
}

export default EmoteSelector;

class Emote extends Component {
    state = {
        isEmoteSelected: false
    };

    onEmoteSelected = (emoteUrl) => {
        if (!this.state.isEmoteSelected) {
            this.props.onEmoteSelect(emoteUrl, () => this.setState({ isEmoteSelected: true }));
        } else {
            this.props.onEmoteRemoved(emoteUrl);
            this.setState({ isEmoteSelected: false });
        }
    }

    render() {
        const { emote, locked } = this.props;

        return (
            <TouchableOpacity key={emote.id} style={{
                flexBasis: '20%',
                aspectRatio: 1,
                padding: '4%',
            }}
                disabled={locked}
                onPress={() => this.onEmoteSelected(emote.images.url_4x)}>
                <Image source={{ uri: emote.images.url_4x }}
                    style={{
                        flex: 1,
                        // tintColor:'#ccc',
                        opacity: locked ? 0.5 : 1,
                    }} />
                {this.state.isEmoteSelected &&
                    <View style={{ position: 'absolute', top: 12, right: 12, zIndex: 9999 }}>
                        <images.svg.checkCircle />
                    </View>
                }
                {locked &&
                    <images.svg.lock style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                    }} />
                }
            </TouchableOpacity>
        );
    }
}
