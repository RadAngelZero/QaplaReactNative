import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './style';

class ChooseOpponentScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.titleText}>
                            Buscar usuario a retar
                        </Text>
                        <Text style={styles.titleText}>
                            X
                        </Text>
                    </View>
                    <TextInput placeholder='Buscar usuarios'
                        style={styles.inputText} />
                </View>
            </View>
        );
    }
}

export default ChooseOpponentScreen;
