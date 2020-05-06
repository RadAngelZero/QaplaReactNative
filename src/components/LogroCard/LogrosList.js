import React from 'react';

import {
  View,
  SafeAreaView,
  Text,
  SectionList
} from 'react-native'

import styles from './style'
import LogroCardItem from '../../components/LogroCard/LogroCardItem';

class LogrosList extends React.Component {
	renderEventOnList = ({ item, index }) => {
		return <LogroCardItem
			key={`event-${item.id}`}
			{...item}
			userId={this.props.userId}
			verified={true} // Remove if the verification is a requirement again
			// verified={this.props.isUserVerified} uncomment if the verification is a requirement again
			 />
	}

	renderSectionHeader = ({ section: { title } }) => {

		console.log(title);
		return <Text style={styles.sectionHeader}>{title}</Text>;
	};

	render() {
		return (
			<SafeAreaView style={styles.sfvContainer}>
				<View style={styles.listContainer}>
					<SectionList
						sections={this.props.logros}
						initialNumToRender={5}
						renderItem={this.renderEventOnList}
						renderSectionHeader={this.renderSectionHeader}
						stickySectionHeadersEnabled={false}
						keyExtractor={(item) => item.id} />
				</View>
			</SafeAreaView>
		);
  }
}

export default LogrosList;
