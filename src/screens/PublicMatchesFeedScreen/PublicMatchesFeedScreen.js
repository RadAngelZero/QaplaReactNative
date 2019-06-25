import React, { Component } from 'react';
import { View } from 'react-native'
import style from './style';
import MatchCardList from '../../components/MatchCard/MatchCardList';
import { matchesRef, getUserDataWithUID } from '../../services/database';

class PublicMatchesFeedScreen extends Component {
    state = {
        matches: [],
        userNames: []
    };

    componentWillMount(){
        const didBlurSubscription = this.props.navigation.addListener(
            'didBlur',
            (payload) => {
                matchesRef.off();
                this.setState({ matches: [], userNames: [] });
            }
        );
        const didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            (payload) => {
                matchesRef.on('child_added', (newPublicMatch) => {
                    console.log(newPublicMatch.key);
                    const { adversary1, alphaNumericIdMatch, bet, date, game, hour, idMatch, numMatches, observations, platform, timeStamp, winBet } = newPublicMatch.val();
                    const matchObject = {
                        adversary1,
                        alphaNumericIdMatch,
                        bet,
                        date,
                        game,
                        hour,
                        idMatch,
                        numMatches,
                        observations,
                        platform,
                        timeStamp,
                        winBet
                    };
                    this.setState((state) => {
                        const matches = [...state.matches, matchObject];
                        return { matches };
                    });
                    getUserDataWithUID(adversary1)
                        .then((data) => {
                            this.setState((state) => {
                                const userNames = [...state.userNames, data.userName];
                                return { userNames };
                            });
                        });
                });
                matchesRef.on('child_removed', (removedPublicMatch) => {
                    const { idMatch } = removedPublicMatch.val();
                    const indexToDelete = this.state.matches.indexOf((match) => (idMatch === match.idMatch));
                    const matchesArrayToUpdate = this.state.matches.filter((match) => (idMatch !== match.idMatch));
                    const userNamesArrayToUpdate = [...this.state.userNames];
                    userNamesArrayToUpdate.splice(indexToDelete, 1);
                    this.setState((state) => {
                        const matches = [...matchesArrayToUpdate];
                        const userNames = [...userNamesArrayToUpdate];
                        return { matches, userNames };
                    });
                });
            }
        );
    }
    render() {
        return (
            <View style={style.container}>
		        <MatchCardList {...this.state} />
            </View>
        );
    }
}

export default PublicMatchesFeedScreen;
