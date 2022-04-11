import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { getPercentWidth, widthPercentageToPx } from '../../utilities/iosAndroidDim';

import StreamerCard from '../StreamerCard/StreamerCard';

class StreamerCardsList extends Component {

    state = {
        scrolled: false,
    }
    componentDidMount() {
        console.log(this.props.dynamicSeparation)
    }

    renderCard = ({ item }) => (
        <View style={{ marginRight: this.state.scrolled ? widthPercentageToPx(getPercentWidth(30)) : widthPercentageToPx(getPercentWidth(10)) }}>
            <StreamerCard {...item}
                horizontal={this.props.horizontal}
                onPress={() => this.props.onCardPress(item)} />
        </View>
    );

    render() {
        return (
            <FlatList
                onScrollBeginDrag={() => { if (this.props.dynamicSeparation) { this.setState({ scrolled: true }); } }}
                onMomentumScrollEnd={(e) => { if (this.props.dynamicSeparation) { this.setState({ scrolled: e.nativeEvent.contentOffset.x >= 20 }); } }}
                horizontal={this.props.horizontal}
                style={{ paddingHorizontal: widthPercentageToPx(getPercentWidth(16)) }}
                onEndReached={this.props.onEndReached}
                onEndReachedThreshold={0.25}
                initialNumToRender={4}
                data={this.props.streamersData}
                renderItem={this.renderCard}
                keyExtractor={item => item.streamerId}
                numColumns={1}
                showsVerticalScrollIndicator={false}
            />
        );
    }
}

export default StreamerCardsList;
