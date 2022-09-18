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

class EmoteSelector extends Component {
    renderEmote = (emote, locked) => {
        return (
            <TouchableOpacity key={emote.id} style={{
                    flexBasis: '20%',
                    aspectRatio: 1,
                    padding: '4%',
                }}
                disabled={locked}
                onPress={() => { this.props.onEmoteSelect(emote.images.url_4x) }}>
                <Image source={{ uri: emote.images.url_4x }}
                    style={{
                        flex: 1,
                    }} />
            </TouchableOpacity>
        );
    }

    renderEmoteSection = ({ item, section }) => {
        return (
            <FlatList data={item}
                keyExtractor={item.id}
                renderItem={({ item }) => this.renderEmote(item, section.locked)}
                numColumns={5} />
    )};

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 16,
                paddingHorizontal: 16,
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
                        renderItem={this.renderEmoteSection}
                        renderSectionHeader={({ section: { key, data } }) => (
                            data && data[0] && data[0].length > 0 ?
                                <Text style={{
                                    fontWeight: '500',
                                    fontSize: 16,
                                    color: 'rgba(255, 255, 255, .8)',
                                    backgroundColor: '#141539',
                                    marginBottom: 8
                                }}>
                                    {key}
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