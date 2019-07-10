import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Svg } from 'react-native-svg';
import styles from './style';
import Images from '../../../assets/images';

const LightningIcon = Images.svg.lightningIcon;
const SearchIcon = Images.svg.searchIcon;

class ChooseMatchTypeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Escoge un tipo de reta</Text>
                <View style={styles.lightningImage}>
                    <Svg>
                        <LightningIcon />
                    </Svg>
                </View>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('LoadGames')}>
                    <View style={styles.publicMatchButton}>
                        <Text style={styles.publicMatchButtonText}>
                            RETA PÚBLICA
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={styles.directMatchButton}>
                        <View style={styles.directMatchButtonSearchIcon}>
                            <Svg>
                                <SearchIcon width={18} height={18} />
                            </Svg>
                        </View>
                        <Text style={styles.publicMatchButtonText}>
                            RETAR USUARIO
                        </Text>
                        <View style={styles.directMatchButtonSearchIcon}></View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default ChooseMatchTypeScreen;
