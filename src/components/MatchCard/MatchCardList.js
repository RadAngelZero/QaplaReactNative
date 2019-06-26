import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import MatchCardItem from './MatchCardItem';
import { styles } from './style';

class MatchCardList extends Component {
    render() {
        const reversedMatchesArray = [...this.props.matches].sort((a, b) => {
            if (a.idMatch < b.idMatch) {
                return 1;
            } else if (a.idMatch > b.idMatch) {
                return -1;
            }
            return 0;
        });
        return (
            <View style={styles.listContainer}>
                <FlatList data={reversedMatchesArray}
                    renderItem={({item}) => <MatchCardItem key={item.alphaNumericIdMatch} {...item} />}
                    keyExtractor={(item) => item.alphaNumericIdMatch} />
            </View>
        );
    }
}

export default MatchCardList;
