// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { Svg } from 'react-native-svg';
import styles from './style';
import Images from '../../../assets/images';
import { recordScreenOnSegment } from '../../services/statistics';

const LightningIcon = Images.svg.lightningIcon;
const SearchIcon = Images.svg.searchIcon;

class ChooseMatchTypeScreen extends Component {
    componentWillMount() {
        this.list = [

            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    recordScreenOnSegment('Choose Match Type');
                }
            )
        ]
    }

    componentWillUnmount() {
        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
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
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChooseOponent')}>
                        <View style={styles.directMatchButton}>
                            <View style={styles.directMatchButtonSearchIcon}>
                                <SearchIcon width={18} height={18} />
                            </View>
                            <Text style={styles.directMatchButtonText}>
                                RETAR USUARIO
                            </Text>
                            <View style={styles.directMatchButtonSearchIcon}></View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </SafeAreaView>
        );
    }
}

export default ChooseMatchTypeScreen;
