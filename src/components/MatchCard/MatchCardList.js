// diego -        06-08-2019 - us75 - initialNumToRender prop added and matchesPlay added of each item of FlatList

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import MatchCardItem from './MatchCardItem';
import { styles } from './style';

import { withNavigation } from 'react-navigation';

class MatchCardList extends Component {
    
    render() {
        const reversedMatchesArray = this.getSortedMatchesArr([...this.props.matches]);

        return (
            <View style={styles.listContainer}>
                <FlatList data={reversedMatchesArray}
                    initialNumToRender={5}
                    renderItem={({item}) => <MatchCardItem matchesPlay={this.props.matchesPlay} key={item.alphaNumericIdMatch} {...item} />}
                    keyExtractor={(item) => item.alphaNumericIdMatch} />
            </View>
        );
    }

    getSortedMatchesArr(matchesArr) {
        const reversedMatchesArray = matchesArr.sort((a, b) => {
            if (a.idMatch < b.idMatch) {
                return 1;
            } else if (a.idMatch > b.idMatch) {
                return -1;
            }
            return 0;
        });

        return reversedMatchesArray;
    }
}

export default withNavigation(MatchCardList);