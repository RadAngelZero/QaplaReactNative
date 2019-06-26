import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';

class MatchCardItem extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => console.log(this.props.idMatch)}>
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

export default MatchCardItem;
