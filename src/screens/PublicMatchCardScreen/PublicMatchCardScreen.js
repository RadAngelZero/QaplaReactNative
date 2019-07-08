import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, Button, TouchableWithoutFeedback } from 'react-native'

import { withNavigation } from 'react-navigation';
import styles from './style'

import Images from '../../../assets/images'
import MatchCardItem from '../../components/MatchCard/MatchCardItem'

class PublicMatchCardScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        console.log("This is PublicMatchcardScreen: " + JSON.stringify(this.props));
    }

    render() {
        // TODO: modify default value into a dummy match saying no info
        const matchCard = this.props.navigation.getParam('matchCard');
       
        const GameIcon = getGameIcon(matchCard.game);
        const QaploinsIcon = Images.svg.qaploinsIcon;
        const ProfileIcon = Images.svg.profileIcon;

        return (
            <SafeAreaView style={styles.container} testID='publicmatchcardscreen-1'>
                <View style={styles.container}>
                    <View style={styles.imageHeader}>
                        <GameIcon width={50} height={50}></GameIcon>
                    </View>
                    <View style={styles.headerRow1}>
                        <QaploinsIcon style={styles.hr1}/>
                        <QaploinsIcon style={styles.hr2}/>
                        <QaploinsIcon style={styles.hr3}/>
                    </View>
                    <View style={styles.headerRow2}>
                        <Text style={styles.gamertag}>{matchCard.userName}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.row}>
                            <View style={styles.infoR1}>
                                <ProfileIcon style={styles.rowIcon}/>
                                <Text style={styles.elemR1}>Gamertag</Text>
                            </View>
                            <View style={styles.infoR2}>
                                <Text style={styles.rightTextStyle}>{matchCard.userName}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.infoR1}>
                                <ProfileIcon style={styles.rowIcon}/>
                                <Text style={styles.elemR1}>No. de Integrantes</Text>
                            </View>
                            <View style={styles.infoR2}>
                                <Text style={styles.rightTextStyle}>{matchCard.numMatches == 1 ? '1vs1' : '*vs*'}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.infoR1}>
                                <ProfileIcon style={styles.rowIcon}/>
                                <Text style={styles.elemR1}>Fecha y Hora</Text>
                            </View>
                            <View style={styles.infoR2}>
                                <Text style={styles.rightTextStyle}>{matchCard.date} {matchCard.hour}hrs</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.infoR1}>
                                <ProfileIcon style={styles.rowIcon}/>
                                <Text style={styles.elemR1}>Qaploins</Text>
                            </View>
                            <View style={styles.infoR2}>
                                <Text style={styles.rightTextStyle}>{matchCard.bet}</Text>
                            </View>
                        </View>
                    </View>
                    <Button
                      onPress={this.goToPrevScreen.bind(this)}
                      title="Regresar"
                      color="#36E5CE"
                      accessibilityLabel="Regresar a retas públicas"
                    />
                </View>
            </SafeAreaView>
        );
    }

    // Description: 
    // Returns to previous screen
    // @Input Params:
    // None
    // @Output Params:
    // None
    goToPrevScreen() {
        const {goBack} = this.props.navigation;
        
        // A key could be used instead of null, but
        // it should have to be passed by the previous
        // screen. Not using any key at the moment, seems
        // to work fine with 'null' value.
        goBack(null);
    }
}

function getGameIcon(game) {
    // TODO: replace with a placeholder
    let icon = Images.svg.qaploinsIcon;

    if (game === "Halo") {
        icon = Images.svg.gowIcon;
    }
    else {
        icon = Images.svg.fifaIcon;
    }

    console.log("miau " + JSON.stringify(Images));

    return icon;
}




export default withNavigation(PublicMatchCardScreen);
