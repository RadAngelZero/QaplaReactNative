import React, { Component } from 'react';
import { Alert, Linking, ScrollView, Text, FlatList, View, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './style';
import images from '../../../assets/images';

class InteractionsSelectInteraction extends Component {

    state = {
        screen: 1, // 0 = emotes, 1 = GIFs, 2 = memes
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    display: 'flex',
                    marginTop: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ screen: 0 })}
                        >
                            <View style={{
                                paddingVertical: 6,
                                paddingHorizontal: 13,
                                backgroundColor: '#29326B',
                                borderRadius: 6,
                            }}>
                                <Text style={{ color: '#fff' }}>Emotes</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 4 }} />
                        <TouchableOpacity
                            onPress={() => this.setState({ screen: 1 })}
                        >
                            <View style={{
                                paddingVertical: 6,
                                paddingHorizontal: 13,
                                backgroundColor: '#29326B',
                                borderRadius: 6,
                            }}>
                                <Text style={{ color: '#fff' }}>GIFs</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 4 }} />
                        <TouchableOpacity
                            onPress={() => this.setState({ screen: 2 })}
                        >
                            <View style={{
                                paddingVertical: 6,
                                paddingHorizontal: 13,
                                backgroundColor: '#29326B',
                                borderRadius: 6,
                            }}>
                                <Text style={{ color: '#fff' }}>Memes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '97%',
                    }}>
                        {this.state.screen === 0 &&
                            <Text style={{ color: '#fff' }}>Emotes</Text>
                        }
                        {this.state.screen === 1 &&
                            <Text style={{ color: '#fff' }}>GIFs</Text>
                        }
                        {this.state.screen === 2 &&
                            <Text style={{ color: '#fff' }}>Memes</Text>
                        }
                    </View>
                </View>
            </View>
        );
    }
}

export default InteractionsSelectInteraction;
