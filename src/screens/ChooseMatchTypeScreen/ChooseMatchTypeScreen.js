// josep.sanahuja    - 12-12-2019 - us160 - Added trackOnSegment import
// josep.sanahuja    - 05-08-2019 - us84  - + SafeAreaView

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { Svg } from 'react-native-svg';
import styles from './style';
import Images from '../../../assets/images';
import { recordScreenOnSegment, trackOnSegment } from '../../services/statistics';
import { getPercentWidth, getPercentHeight } from '../../utilities/iosAndroidDim';

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

    /**
     * @description
     * Sends an event tracking public match button pressed and navigate to LoadGames screen.
     */
    goToLoadGames = () => {
        trackOnSegment('Public Match Button');
        this.props.navigation.navigate('LoadGames');
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
                    <TouchableWithoutFeedback onPress={this.goToLoadGames}>
                        <View style={styles.publicMatchButton}>
                            <Text style={styles.publicMatchButtonText}>
                                Reta Pública
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={styles.directMatchButton}>
                            <View style={styles.directMatchButtonSearchIcon}>
                                <SearchIcon width={18} height={18} />
                            </View>
                            <Text style={styles.directMatchButtonText}>
                                Retar Usuario
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
