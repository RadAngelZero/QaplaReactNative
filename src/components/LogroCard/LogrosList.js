// josep.sanahuja - 26-09-2019 - us118 - Added userId to LogroCardItem
// josep.sanahuja - 20-09-2019 - us111 - Added verified on LogroCardItem
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React from 'react';

import {
  View,
  SafeAreaView,
  FlatList
} from 'react-native'

import styles from './style'
import LogroCardItem from '../../components/LogroCard/LogroCardItem';

class LogrosList extends React.Component {
  render() {
    return (
        <SafeAreaView style={styles.sfvContainer}>
            <View style={styles.listContainer}>
                <FlatList
                    data={this.props.logros}
                    initialNumToRender={5}
                    renderItem={({item, index}) => <LogroCardItem
                        {...item}
                        userId={this.props.userId}
                        verified={true} // Remove if the verification is a requirement again
                        // verified={this.props.isUserVerified} uncomment if the verification is a requirement again
                        lastChild={index === this.props.logros.length - 1} />}
                        keyExtractor={(item) => item.id} />
            </View>
        </SafeAreaView>
    );
  }
}

export default LogrosList;
