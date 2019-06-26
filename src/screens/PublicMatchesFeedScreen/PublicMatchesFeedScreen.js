import React, { Component } from 'react';
import { View } from 'react-native'
import style from './style';
import MatchCardList from '../../components/MatchCard/MatchCardList';
import { matchesRef, getUserNameWithUID } from '../../services/database';

class PublicMatchesFeedScreen extends Component {
    state = {
        matches: [],
    };

    componentWillMount(){
        /**
         * This event is triggered when the user goes to other screen
         */
        const didBlurSubscription = this.props.navigation.addListener(
            'didBlur',
            (payload) => {
                /**
                 * Remove the listeners on matchesRef and clean the state
                 */
                matchesRef.off();
                this.setState({ matches: [] });
            }
        );
        /**
         * This event is triggered when the user enter (focus) on this screen
         */
        const didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            (payload) => {
                /**
                 * Add a listener of type child_added. In the first load bring all the
                 * childs of the matches node.
                 * When a new child is added the event is triggered to add the new match
                 * to the state
                 * Reference: https://firebase.google.com/docs/database/web/lists-of-data?hl=es-419
                 */
                matchesRef.on('child_added', async (newPublicMatch) => {
                    //Take the necesary information from the object returned of the database
                    const { adversary1, alphaNumericIdMatch, bet, date, game, hour, idMatch, numMatches, observations, platform, timeStamp, winBet } = newPublicMatch.val();
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
                        userName: await getUserNameWithUID(newPublicMatch.val().adversary1).then((userName) => userName)
                    };
                    this.setState((state) => {
                        //Add the matchObject to the matches array of the state
                        const matches = [...state.matches, matchObject];
                        return { matches };
                    });
                });
                /**
                 * Add a listener of type child_removed.
                 * When a child is removed from matches the event is triggered to remove the match
                 * from the state
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
