import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    ActivityIndicator,
    FlatList,
    Image,
} from 'react-native';

class EmoteSelector extends Component {

    renderItem = ({ item }) => (
        <TouchableOpacity style={{
            flexBasis: '33.33333%',
            aspectRatio: 1,
            padding: '0.25%',
        }}
            onPress={() => { this.props.onEmoteSelect(item) }}
        >
            <Image source={{ uri: item.url }}
                style={{
                    flex: 1,
                }} />
        </TouchableOpacity>
    );

    render() {
        return (<View style={{
            flex: 1,
        }}>
            <FlatList
                numColumns={3}
                data={this.props.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
            />
        </View>);
    }
}

export default EmoteSelector;