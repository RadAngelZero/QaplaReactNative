import React from 'react';
import { connect } from 'react-redux';
import {
	FlatList,
	Text,
	View
} from 'react-native';

import styles from './style';

import StreamLiveCard from '../StreamLiveCard/StreamLiveCard';
import { translate } from '../../utilities/i18';

class StreamLiveList extends React.Component {
	renderEventOnList = ({ item }) => {
		return <StreamLiveCard
			key={`liveStream-${item.id}`}
			{...item}
			uid={this.props.uid}
			stream={item} />
	}

	render() {
		const liveStreams = this.props.streamsLists.live;

		// If there are no streams or the user is already participating in all the featured streams render null
		if (Object.keys(liveStreams).length) {
			return (
				<>
				<View style={styles.listContainer}>
					<View style={styles.sectionHeaderContainer}>
						<Text style={styles.sectoinHeaderText}>
							{translate('TimelineStreams.live')}
						</Text>
						<View
							style={styles.sectionHeaderIcon}
						/>
					</View>
					<FlatList data={Object.keys(liveStreams).sort((a, b) => liveStreams[a].timestamp - liveStreams[b].timestamp).map((streamId) => liveStreams[streamId])}
						onScrollBeginDrag={() => { if (this.props.dynamicSeparation) {this.setState({ scrolled: true });}}}
						onMomentumScrollEnd={(e) => { if (this.props.dynamicSeparation) {this.setState({scrolled: e.nativeEvent.contentOffset.x >= 20});}}}
						horizontal
						initialNumToRender={5}
						renderItem={this.renderEventOnList}
						ListFooterComponent={() => <View style={{ height: 30 }} />}
						keyExtractor={(item) => item.id} />
				</View>
				<View style={{ height: 40 }} />
				</>
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

export default connect(mapStateToProps)(StreamLiveList);
