import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import MatchCardItem from './MatchCardItem';
import { styles } from './style';

class MatchCardList extends Component {
    render() {
        return (
            <View style={styles.listContainer}>
                <FlatList data={[
                    {game: 'Clash Royale', bet: 450, time: '22:00', player: 'El diego', stringId: '273HYdutli723'},
                    {game: 'Fifa 19', bet: 75, time: '12:00', player: 'El diego', stringId: '743OkEunum389'}
                ]}
                renderItem={({item}) => <MatchCardItem key={item.stringId} {...item} />}
                keyExtractor={(item) => item.stringId} />
            </View>
        );
    }
}

export default MatchCardList;
