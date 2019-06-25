import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import MatchCardItem from './MatchCardItem';
import { styles } from './style';

class MatchCardList extends Component {
    render() {
        const reversedUserNamesArray = [...this.props.userNames].reverse();
        const reversedMatchesArray = [...this.props.matches].reverse();
        return (
            <View style={styles.listContainer}>
                {this.props.userNames.length === this.props.matches.length &&
                    <FlatList data={reversedMatchesArray}
                        renderItem={({item, index}) => <MatchCardItem key={item.alphaNumericIdMatch} userName={reversedUserNamesArray[index]} {...item} />}
                        keyExtractor={(item) => item.alphaNumericIdMatch} />
                }
            </View>
        );
    }
}

export default MatchCardList;
