import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

import styles from './style';

class ReactionTypesScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{
                        marginTop: 16,
                        backgroundColor: '#FFF'
                    }}
                    onPress={() => this.props.navigation.navigate('TweetReactionScreen', { reactionLevel: 1 })}>
                    <Text>
                        Nivel 1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                        marginTop: 16,
                        backgroundColor: '#FFF'
                    }}
                    onPress={() => this.props.navigation.navigate('TweetReactionScreen', { reactionLevel: 2 })}>
                    <Text>
                        Nivel 2
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                        marginTop: 16,
                        backgroundColor: '#FFF'
                    }}
                    onPress={() => this.props.navigation.navigate('TweetReactionScreen', { reactionLevel: 3 })}>
                    <Text>
                        Nivel 3
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

export default ReactionTypesScreen;