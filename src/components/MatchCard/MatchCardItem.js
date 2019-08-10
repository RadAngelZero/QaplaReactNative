// diego -        06-08-2019 - us75 - Class now extends from PureComponent instead of Component and defaultProps added
// diego -        29-07-2019 - us55 - Remove unnecessary log from on press event

import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';

import { withNavigation } from 'react-navigation';

class MatchCardItem extends PureComponent {
    render() {
        const {navigate} = this.props.navigation;

        return (
            <TouchableWithoutFeedback onPress={() => navigate('MatchCard', {matchCard: this.props})}>
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

MatchCardItem.defaultProps = {
    matchesPlay: false
};

export default withNavigation(MatchCardItem);
