import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	FlatList
} from 'react-native';

import styles from './style';
import StreamCard from '../StreamCard/StreamCard';
import { translate } from '../../utilities/i18';
import QaplaText from '../QaplaText/QaplaText';
import Colors from '../../utilities/Colors';

class FeaturedStreamsList extends React.Component {
	state = {
		scrolled: false,
	};

	renderEventOnList = ({ item, index }) => {
		if (!this.props.loadOnlyUserStreams && item.isUserAParticipant) {
			return null;
		} else if (this.props.loadOnlyUserStreams && !item.isUserAParticipant) {
			return null;
		}

		return (
			<StreamCard onPress={this.props.onCardPress}
				index={index % Colors.featuredStreamsGradients.length}
				key={`streamFeatured-${item.id}`}
				onStreamerProfileButtonPress={this.props.onStreamerProfileButtonPress}
				stream={item}
				uid={this.props.uid} />
		);
	}

	render() {
		const featuredStreams = this.props.streamsLists.featured;

		// If there are no streams or the user is already participating in all the featured streams render null
		if (Object.keys(featuredStreams).length && Object.keys(featuredStreams).some((streamId) => this.props.loadOnlyUserStreams ? featuredStreams[streamId].isUserAParticipant : !featuredStreams[streamId].isUserAParticipant)) {
			return (
				<View style={styles.listContainer}>
					<QaplaText style={styles.sectionHeader}>{translate('TimelineStreams.featuredEvent')}</QaplaText>
					<FlatList data={Object.keys(featuredStreams).sort((a, b) => featuredStreams[a].timestamp - featuredStreams[b].timestamp).map((streamId) => featuredStreams[streamId])}
						onScrollBeginDrag={() => { if (this.props.dynamicSeparation) {this.setState({ scrolled: true });}}}
						onMomentumScrollEnd={(e) => { if (this.props.dynamicSeparation) {this.setState({scrolled: e.nativeEvent.contentOffset.x >= 20});}}}
						horizontal
						initialNumToRender={5}
						renderItem={this.renderEventOnList}
						ListFooterComponent={() => <View style={{ height: 30 }} />}
						keyExtractor={(item) => item.id} />
				</View>
			);
		}

		return null;
	}
}

function mapStateToProps(state) {
	/**
     * For some reason if we map the state.streamsReducer.streamsLists.featured directly to our props when it is updated
     * (on streamsReducer) the update does not reach the component (it does not trigger a re render) but if we map
     * state.streamsReducer.streamsLists when the featured array is updated we inmediately receive the update
     */
    return {
        streamsLists: state.streamsReducer.streamsLists
    };
}

FeaturedStreamsList.defaultProps = {
	loadOnlyUserStreams: false
};

export default connect(mapStateToProps)(FeaturedStreamsList);
