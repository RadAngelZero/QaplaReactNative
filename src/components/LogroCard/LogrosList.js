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
                    renderItem={({item}) => <LogroCardItem verified={this.props.isUserVerified} {...item} />}
                    keyExtractor={(item) => item.id} />      
            </View>
	      </SafeAreaView>
    );
  }
}

export default LogrosList;
