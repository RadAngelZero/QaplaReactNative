import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import MatchCardItem from './MatchCardItem';
import { styles } from './style';

class MatchCardList extends Component {
    render() {
        const reversedUserNamesArray = this.props.userNames.reverse();
        return (
            <View style={styles.listContainer}>
                {this.props.userNames.length === this.props.matches.length &&
                    <FlatList data={this.props.matches.reverse()}
                        renderItem={({item, index}) => <MatchCardItem key={item.alphaNumericIdMatch} userName={reversedUserNamesArray[index]} {...item} />}
                        keyExtractor={(item) => item.alphaNumericIdMatch} />
                }
            </View>
        );
    }
}

export default MatchCardList;
