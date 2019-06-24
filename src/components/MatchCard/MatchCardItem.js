import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';

class MatchCardItem extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => console.log('Press')}>
                <View style={styles.container}>
                        <>
                            <View style={styles.row}>
                                <Text style={styles.leftTextStyle}>{this.props.game.toUpperCase()}</Text>
                                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                    <Text style={styles.rightTextStyle}>{this.props.bet}</Text>
                                    <Text style={styles.rightTextStyle}>{this.props.time}</Text>
                                </View>
                            </View>
                            <View style={[styles.row, styles.marginBottom10]}>
                                <Text style={styles.leftTextStyle}>{this.props.player}</Text>
                                <Text style={styles.rightTextStyle}>ID {this.props.stringId}</Text>
                            </View>
                        </>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default MatchCardItem;
