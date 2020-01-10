// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { View, Text, TextInput, BackHandler, SafeAreaView } from 'react-native';

import styles from './style';
import { translate } from '../../utilities/i18';

class ChooseOpponentScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.titleText}>
                                {translate('chooseOpponentScreen.title')}
                            </Text>
                            <Text style={styles.titleText} onPress={this.backToMatchTypeScreen}>
                                X
                            </Text>
                        </View>
                        <TextInput placeholder={translate('chooseOpponentScreen.searchPlaceholder')}
                            style={styles.inputText} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default ChooseOpponentScreen;
