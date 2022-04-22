import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    SectionList,
    // RefreshControl,
} from 'react-native';

import styles from './style';
import QaplaText from '../QaplaText/QaplaText';
import Colors from '../../utilities/Colors';

import StreamLivecard from '../StreamLiveCard/StreamLiveCard';

/**
 * Container to add extra marginBottom on the last child of the list
 * (UI purpose)
 * @param {element} children Card to render into the container
 * @param {boolean} lastChild Flag to know if we need to add the margin bottom
 */
const CardContainer = ({ children, lastChild, scrolled, dynamicSeparationWidth }) => (
    <View
        style={{ marginBottom: lastChild ? (dynamicSeparationWidth || 40) * 0.75 : 0, marginRight: lastChild ? 0 : scrolled ? (dynamicSeparationWidth || 40) : ((dynamicSeparationWidth || 0) / 2) }}
    >
        {children}
    </View>
);

class StreamLiveItem extends Component {
    render() {
        /**
         * TODO: Change all the received props from the database (in spanish) to english, then send it to the different logro
         * Also change the reference inside every logro
         */
        const { lastChild, scrolled, dynamicSeparationWidth } = this.props;
        return (
            <CardContainer lastChild={lastChild} scrolled={scrolled} dynamicSeparationWidth={dynamicSeparationWidth}><StreamLivecard {...this.props} /></CardContainer>
        );
    }
}

class StreamLiveList extends React.Component {
	state = {
		refreshing: false,
		scrolled: false,
	};

	renderEventOnList = ({ item }) => {
		return <StreamLiveItem
			dynamicSeparationWidth={this.props.dynamicSeparationWidth}
			scrolled={this.state.scrolled}
			key={`event-${item.id}`}
			{...item}
			userId={this.props.userId}
			verified={true} // Remove if the verification is a requirement again
			// verified={this.props.isUserVerified} uncomment if the verification is a requirement again
			eventToDisplay={this.props.eventToDisplay} />
	}

	render() {
		return (
			<SafeAreaView style={styles.sfvContainer}>
				<View style={styles.listContainer}>
					<SectionList
						onScrollBeginDrag={() => { if (this.props.dynamicSeparation) {this.setState({ scrolled: true });}}}
						onMomentumScrollEnd={(e) => { if (this.props.dynamicSeparation) {this.setState({scrolled: e.nativeEvent.contentOffset.x >= 20});}}}
						horizontal={this.props.horizontal}
						sections={this.props.logros}
						// refreshControl={<RefreshControl
						// 	progressBackgroundColor={Colors.eventCardBackground}
						// 	colors={[Colors.greenQapla]}
						// 	tintColor={Colors.greenQapla}
						// 	onRefresh={this.refreshEvents}
						// 	refreshing={this.state.refreshing} />}
						initialNumToRender={5}
						renderItem={this.renderEventOnList}
						stickySectionHeadersEnabled={false}
						ListFooterComponent={() => <View style={{ height: 30 }} />}
						keyExtractor={(item) => item.id} />
				</View>
			</SafeAreaView>
		);
	}
}

export default StreamLiveList;
