// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './style';
import MatchCardList from '../../components/MatchCard/MatchCardList';
import { matchesRef, getUserNameWithUID, getGamerTagWithUID } from '../../services/database';
import { connect } from 'react-redux';

export class MyMatchesScreen extends Component {
    state = {
        matches: []
    };

    componentDidMount(){
        this.list = [
            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'didBlur',
                (payload) => {
                    /**
                     * Remove the listeners on matchesRef and clean the state
                     */
                    matchesRef.off();
                    this.setState({ matches: [] });
                }
            ),
            /**
             * This event is triggered when the user enter (focus) on this screen
             */
            this.props.navigation.addListener(
                'didFocus',
                (payload) => {
                    /**
                     * Listen to childs_added for matches where te adversary1 is the current user (the user is the creator of the match)
                     */
                    matchesRef.orderByChild('adversary1').equalTo(this.props.id).on('child_added', async (hostedMatches) => {
                        if (hostedMatches.val().adversary2 !== '') {
                            //Take the necesary information from the object returned of the database
                            const { adversary2, alphaNumericIdMatch, bet, date, game, hour, idMatch, numMatches, observations, platform, timeStamp, winBet } = hostedMatches.val();
                            //Object with the necesary fields to load the match in the app (the card and the detailed view)
                            const matchObject = {
                                adversary2,
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
                                winBet,
                                //Get the userName from a external function because the match object only have the UID
                                userName: await getUserNameWithUID(hostedMatches.val().adversary2).then((userName) => userName),
                                gamerTag: await getGamerTagWithUID(hostedMatches.val().adversary2, hostedMatches.val().game, hostedMatches.val().platform).then((gamerTag) => gamerTag)
                            };
                            this.setState((state) => {
                                //Add the matchObject to the matches array of the state
                                const matches = [...state.matches, matchObject];
                                return { matches };
                            });
                        }
                    });
                    /**
                     * Listen to childs_added for matches where te adversary2 is the current user (the user has accepted the challenge of other user)
                     */
                    matchesRef.orderByChild('adversary2').equalTo(this.props.id).on('child_added', async (challengedMatches) => {
                        //Take the necesary information from the object returned of the database
                        const { adversary1, alphaNumericIdMatch, bet, date, game, hour, idMatch, numMatches, observations, platform, timeStamp, winBet } = challengedMatches.val();
                        //Object with the necesary fields to load the match in the app (the card and the detailed view)
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
                            winBet,
                            //Get the userName from a external function because the match object only have the UID
                            userName: await getUserNameWithUID(challengedMatches.val().adversary1).then((userName) => userName),
                            gamerTag: await getGamerTagWithUID(challengedMatches.val().adversary1, challengedMatches.val().game, challengedMatches.val().platform).then((gamerTag) => gamerTag)
                        };
                        this.setState((state) => {
                            //Add the matchObject to the matches array of the state
                            const matches = [...state.matches, matchObject];
                            return { matches };
                        });
                    });
                    /**
                     * Listen to detect when a user accept a challenge from the current user (adversary2 field is filled) or remove if adversary cancels their
                     * participation on the match
                     */
                    matchesRef.orderByChild('adversary1').equalTo(this.props.id).on('child_changed', async (updatedMatch) => {
                        var copyOfMatches = [...this.state.matches];
                        const indexToUpdate = copyOfMatches.findIndex((element) => element.idMatch === updatedMatch.key);
                        if (updatedMatch.val().adversary2 !== '') {
                            if (indexToUpdate !== -1) {
                                copyOfMatches[indexToUpdate] = updatedMatch.val();
                                copyOfMatches[indexToUpdate].userName = await getUserNameWithUID(updatedMatch.val().adversary2).then((userName) => userName);
                                copyOfMatches[indexToUpdate].gamerTag = await getGamerTagWithUID(updatedMatch.val().adversary2, updatedMatch.val().game, updatedMatch.val().platform).then((gamerTag) => gamerTag);
                            } else {
                                copyOfMatches.push(updatedMatch.val());
                                copyOfMatches[copyOfMatches.length - 1].userName = await getUserNameWithUID(updatedMatch.val().adversary2).then((userName) => userName);
                                copyOfMatches[copyOfMatches.length - 1].gamerTag = await getGamerTagWithUID(updatedMatch.val().adversary2, updatedMatch.val().game, updatedMatch.val().platform).then((gamerTag) => gamerTag);
                            }
                        } else {
                            copyOfMatches.splice(indexToUpdate, 1);
                        }
                        this.setState((state) => {
                            //Add the matchObject to the matches array of the state
                            const matches = [...copyOfMatches];
                            return { matches };
                        });
                    });
                    /**
                     * Add a listener of type child_removed.
                     * When a child is removed from matches the event is triggered to remove the match from the state
                     * Reference: https://firebase.google.com/docs/database/web/lists-of-data?hl=es-419
                     */
                    matchesRef.on('child_removed', (removedPublicMatch) => {
                        //Get the id of the match
                        const { idMatch } = removedPublicMatch.val();
                        //Create a new array and assign the filtered original array
                        //The filter return every match except the match who id is the same that idMatch
                        const matchesArrayFiltered = this.state.matches.filter((match) =>(idMatch !== match.idMatch));
                        this.setState((state) => {
                            //Asiggn the filteredArray to the state
                            const matches = [...matchesArrayFiltered];
                            return { matches };
                        });
                    });
                }
            )
        ];
    }

    componentWillUnmount() {
        //Remove didBlur and didFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
    		        <MatchCardList {...this.state} />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    if (state.userReducer.user.hasOwnProperty('id')) {
        return {
            id: state.userReducer.user.id
        };
    }
    return { id: '' };
}

export default MyMatchesScreen = connect(mapStateToProps)(MyMatchesScreen);
