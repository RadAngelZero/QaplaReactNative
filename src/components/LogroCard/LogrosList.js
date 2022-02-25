import React from 'react';

import {
	View,
	SafeAreaView,
	SectionList,
	RefreshControl
} from 'react-native'

import styles from './style'
import LogroCardItem from '../../components/LogroCard/LogroCardItem';
import QaplaText from '../QaplaText/QaplaText';
import { emptyLogros, loadQaplaLogros } from './../../actions/logrosActions';
import store from './../../store/store';
import Colors from '../../utilities/Colors';

class LogrosList extends React.Component {
	state = {
		refreshing: false
	};

	renderEventOnList = ({ item }) => {
		return <LogroCardItem
			key={`event-${item.id}`}
			{...item}
			userId={this.props.userId}
			verified={true} // Remove if the verification is a requirement again
			// verified={this.props.isUserVerified} uncomment if the verification is a requirement again
			eventToDisplay={this.props.eventToDisplay} />
	}

	renderSectionHeader = ({ section: { title } }) => <QaplaText style={styles.sectionHeader}>{title}</QaplaText>

	refreshEvents = async () => {
		this.setState({ refreshing: true });
		await store.dispatch(emptyLogros());
		await store.dispatch(loadQaplaLogros());
		this.setState({ refreshing: false });
	}

	render() {
		return (
			<SafeAreaView style={styles.sfvContainer}>
				<View style={styles.listContainer}>
					<SectionList
						horizontal
						sections={this.props.logros}
						refreshControl={<RefreshControl
							progressBackgroundColor={Colors.eventCardBackground}
							colors={[Colors.greenQapla]}
							tintColor={Colors.greenQapla}
							onRefresh={this.refreshEvents}
							refreshing={this.state.refreshing} />}
						initialNumToRender={5}
						renderItem={this.renderEventOnList}
						renderSectionHeader={this.renderSectionHeader}
						stickySectionHeadersEnabled={false}
						ListFooterComponent={() => <View style={{ height: 30 }} />}
						keyExtractor={(item) => item.id} />
				</View>
			</SafeAreaView>
		);
	}
}

export default LogrosList;
