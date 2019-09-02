// diego          - 09-08-2019 - bug4 - update remove listener methods on willBlur and make unshift of the new data on array
// josep.sanahuja - 05-08-2019 - us84 - + SafeAreaView
// diego          - 05-08-2019 - us58   - Bug fixed: the matches array was not deleted when willBlur was called
// josep.sanahuja - 08-07-2019 - us83 - + 'userName-creation-scenario' asyncStg flag & 'constructor'

import React, { Component } from 'react';
import { View } from 'react-native'
import style from './style';
import MatchCardList from '../../components/MatchCard/MatchCardList';
import { matchesRef, getUserNameWithUID, getGamerTagWithUID } from '../../services/database';
import CreateRetasButton from '../../components/CreateRetasButton/CreateRetasButton';
import { isUserLogged } from '../../services/auth';
import { storeData } from '../../utilities/persistance';
import { recordScreenOnSegment } from '../../services/statistics';

class PublicMatchesFeedScreen extends Component {
    state = {
        matches: []
    };

    componentWillMount(){
        this.list = [
            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willBlur',
                (payload) => {
                    /**
                     * Remove the listeners on matchesRef and clean the state
                     * as we use the child_added and child_removed listeners
                     * we need to remove it one by one
                     */
                    matchesRef.off('child_added');
                    matchesRef.off('child_removed');
                    var stateCopy = [...this.state.matches];
                    stateCopy.splice(0);
                    this.setState({ matches: stateCopy });
                }
            ),

            /**
             * This event is triggered when the user enter (focus) on this screen
             */
            this.props.navigation.addListener(
                'willFocus',
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
                            adversaryUid: adversary1,
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
                            userName: await getUserNameWithUID(newPublicMatch.val().adversary1),
                            gamerTag: await getGamerTagWithUID(newPublicMatch.val().adversary1, newPublicMatch.val().game, newPublicMatch.val().platform)
                        };
                        this.setState((state) => {
                            //Add the matchObject to the matches array of the state
                            const matches = [...state.matches];
                            /*
                            * NOTE: For som undiscovered reason, in the first time when the component is created in the MatchCardList, the array of 
                            * matches is sorted but in any other render execution the sort is not called (fixed on PublicMatchesFeedScreen making 
                            * unshift when get new match)
                            */
                            matches.unshift(matchObject);
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
                        const matchesArrayFiltered = this.state.matches.filter((match) => (idMatch !== match.idMatch));
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
        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    render() {
        return (
            <View style={style.container}>
		        <MatchCardList {...this.state} />
                <CreateRetasButton highlighted={!this.props.navigation.getParam('firstMatchCreated')} onPress={this.onCrearRetaButtonPress.bind(this)} />
            </View>
        );
    }

    onCrearRetaButtonPress() {
        if(!this.props.navigation.getParam('firstMatchCreated')){
            storeData('first-match-created', 'true');
            storeData('userName-creation-scenario', 'CreateFirstMatchFromRetas');
        }

        this.props.navigation.navigate(isUserLogged() ? 'ChooseMatchType' : 'SignIn');
    }
}

export default PublicMatchesFeedScreen;
