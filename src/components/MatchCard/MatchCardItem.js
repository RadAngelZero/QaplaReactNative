import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';

import { withNavigation } from 'react-navigation';

class MatchCardItem extends Component {
    render() {
        const {navigate} = this.props.navigation;

        return (
            <TouchableWithoutFeedback onPress={() => {console.log("Match card Item" + this.props.idMatch); navigate('MatchCard', {matchCard: this.props})}}>
                <View style={styles.container}>
                        <>
                            <View style={styles.row}>
                                <Text style={styles.leftTextStyle}>{this.props.game.toUpperCase()}</Text>
                                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                    <Text style={styles.rightTextStyle}>{this.props.bet}</Text>
                                    <Text style={styles.rightTextStyle}>{this.props.hour}</Text>
                                </View>
                            </View>
                            <View style={[styles.row, styles.marginBottom10]}>
                                <Text style={styles.leftTextStyle}>{this.props.userName}</Text>
                                <Text style={styles.rightTextStyle}>ID {this.props.alphaNumericIdMatch}</Text>
                            </View>
                        </>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default withNavigation(MatchCardItem);
