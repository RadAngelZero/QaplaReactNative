// diego           - 19-08-2019 - us89 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './style';
import images from '../../../assets/images';

const QaploinExchange = images.svg.qaploinsIcon;

export class UserProfileScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.userInfoContainer}>
                    <View style={styles.imageAndNameContainer}>
                        {this.props.userProfilePhoto ?
                            <Image style={styles.avatarImage} source={{ uri: this.props.userProfilePhoto }} />
                            :
                            <View style={styles.avatarImage} />
                        }
                        <Text style={styles.userName}>DHVSII</Text>
                    </View>
                    <View style={styles.manageQaploinsContainer}>
                        <View style={styles.qaploinInfoContainer}>
                            <QaploinExchange style={styles.qaploinImage} />
                            <Text style={styles.qaploinsAmount}>11000</Text>
                        </View>
                        <TouchableWithoutFeedback>
                            <View style={styles.addQaploinsButton}>
                                <Text style={styles.addQaploinsButtonText}>Abonar</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback>
                    <View style={styles.fab}>
                        <Text style={styles.fabText}>+</Text>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        );
    }
}

UserProfileScreen.defaultProps = {
    userProfilePhoto: 'https://espaciociencia.com/wp-content/uploads/metamorfismo-roca-1.jpg'
}

export default UserProfileScreen;
