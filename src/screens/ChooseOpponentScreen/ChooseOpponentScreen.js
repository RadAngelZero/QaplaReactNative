// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';

import styles from './style';
import { translate } from '../../utilities/i18';
import QaplaText from '../../components/QaplaText/QaplaText';

class ChooseOpponentScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.titleRow}>
                            <QaplaText style={styles.titleText}>
                                {translate('chooseOpponentScreen.title')}
                            </QaplaText>
                            <QaplaText style={styles.titleText} onPress={this.backToMatchTypeScreen}>
                                X
                            </QaplaText>
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
