import React, { Component } from 'react';
import { FlatList } from 'react-native';

import StreamerCard from '../StreamerCard/StreamerCard';

class StreamerCardsList extends Component {
    renderCard = ({ item }) => (
        <StreamerCard {...item}
            onPress={() => this.props.onCardPress(item)} />
    );

    render() {
        return (
            <FlatList
                onEndReached={this.props.onEndReached}
                onEndReachedThreshold={.25}
                initialNumToRender={4}
                data={this.props.streamersData}
                renderItem={this.renderCard}
                keyExtractor={item => item.streamerId}
                numColumns={1}
                showsVerticalScrollIndicator={false} />
        );
    }
}

export default StreamerCardsList;
