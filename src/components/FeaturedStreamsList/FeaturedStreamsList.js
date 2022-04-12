import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	FlatList,
	RefreshControl
} from 'react-native';

import styles from './style';
import Colors from '../../utilities/Colors';
import NewEventCard from '../NewEventCard/NewEventCard';
import { translate } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';

class FeaturedStreamsList extends React.Component {
	state = {
		scrolled: false,
	};

	renderEventOnList = ({ item }) => (
		<NewEventCard onPress={this.props.onCardPress}
			dynamicSeparationWidth={this.props.dynamicSeparationWidth}
			scrolled={this.state.scrolled}
			key={`event-${item.id}`}
			stream={item}
			uid={this.props.uid} />
	);

	render() {
		return (
            <View style={styles.listContainer}>
				<QaplaText style={styles.sectionHeader}>{translate('TimelineStreams.featuredEvent')}</QaplaText>
                <FlatList data={Object.keys(this.props.featuredStreams).sort((a, b) => this.props.featuredStreams[a].timestamp - this.props.featuredStreams[b].timestamp) .map((eventId) => this.props.featuredStreams[eventId])}
                    onScrollBeginDrag={() => { if (this.props.dynamicSeparation) {this.setState({ scrolled: true });}}}
                    onMomentumScrollEnd={(e) => { if (this.props.dynamicSeparation) {this.setState({scrolled: e.nativeEvent.contentOffset.x >= 20});}}}
                    horizontal
                    refreshControl={<RefreshControl
                        progressBackgroundColor={Colors.eventCardBackground}
                        colors={[Colors.greenQapla]}
                        tintColor={Colors.greenQapla}
                        onRefresh={this.refreshEvents}
                        refreshing={this.state.refreshing} />}
                    initialNumToRender={5}
                    renderItem={this.renderEventOnList}
                    ListFooterComponent={() => <View style={{ height: 30 }} />}
                    keyExtractor={(item) => item.id} />
            </View>
		);
	}
}

function mapStateToProps(state) {
    return {
        featuredStreams: state.streamsReducer.streamsLists.featured
    };
}

export default connect(mapStateToProps)(FeaturedStreamsList);
