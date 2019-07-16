// josep.sanahuja - 17-07-2019 - us25 - + openModal
// diego          - 16-07-2019 - us30 - update navigation when GamerTag is added

import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, TextInput, Modal, Alert } from 'react-native';
import styles from './style'
import Svg from 'react-native-svg';

import {
    setSelectedGame
} from '../../actions/gamesActions';

import { connect } from 'react-redux';

import {
    getGamerTagWithUID
} from '../../services/database';
import { withNavigation } from 'react-navigation';

class GameCard extends Component {

    render() {
        const {game} = this.props;
        console.log("[GameCard] : componentDidMount - render: " + JSON.stringify(this.props.game));

        return (
            <TouchableWithoutFeedback onPress={this.openModal.bind(this)}>
                <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
                    <Image 
                        style={game.fullImage ? styles.fullImageStyle : styles.noFullImageStyle} 
                        source={game.image[this.props.platform]}/>
                    
                    <View style={styles.detailsContainer}>
                        <Svg style={styles.iconContainer}>
                            <game.Icon width={30} height={30} />
                        </Svg>
                        
                        <Text style={styles.gameName}>
                            {game.name}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    openModal = async() => {
        
        // Create a new game object which is extended with the platform member
        // so that it can be used in LoadGamesScreen inside the modal.
        let newGame = this.props.game;
        newGame.platform = this.props.platform;
        newGame.gameKey = this.props.gameKey;

        // Update Redux State with the current game selected so we can use it in the
        // modal from the screen where all games are listed.
        this.props.setSelectedGame(newGame);
        
        const gtag = await getGamerTagWithUID(this.props.user.id, newGame.gameKey, newGame.platform);

        console.log("[GameCard] : openModal - gtag: " + JSON.stringify(gtag) + " props: " + JSON.stringify(this.props.user));

        // If the game selected has a gamertag then we don't open the modal 
        if (gtag.gamerTag == undefined || gtag.gamerTag == null) {
            console.log("[GameCard] : openModal - inside gtag if");
             // Enable modal in LoadGamesScreen
            this.props.showModalAddGameProfile(true);
        }
        else {
            this.props.navigation.navigate('SetBet', {game: newGame});
            console.log("[GameCard] : openModal - else");
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedGame: (game) => setSelectedGame(game)(dispatch)
    };
}

// NOTE: when calling redux connect with only mapDispatchToProps, it will complain about
// dispatch not being found as a function. Fix to that is to use null as the first parameter.
export default GameCard = withNavigation(connect(mapStateToProps, mapDispatchToProps)(GameCard));
