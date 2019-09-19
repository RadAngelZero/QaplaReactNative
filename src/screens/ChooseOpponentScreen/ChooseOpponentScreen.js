// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { View, Text, TextInput, BackHandler, SafeAreaView } from 'react-native';
import styles from './style';

class ChooseOpponentScreen extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToMatchTypeScreen);
    }

    backToMatchTypeScreen = () => {
        this.props.navigation.navigate('ChooseMatchType');
        return true;
    }
    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.titleText}>
                                Buscar usuario a retar
                            </Text>
                            <Text style={styles.titleText} onPress={this.backToMatchTypeScreen}>
                                X
                            </Text>
                        </View>
                        <TextInput placeholder='Buscar usuarios'
                            style={styles.inputText} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default ChooseOpponentScreen;
