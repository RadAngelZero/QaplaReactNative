// diego             - 15-11-2019 - us149 - Check if user data is loaded on mapStateToProps
// diego             - 05-09-2019 - us104 - Send pickResult's as prop for allow just one upload of result by user in a match
// diego             - 05-09-2019 - us101 - Send hour result for set timer on detail match screen
// diego             - 03-09-2019 - us96 - Bug fixed: load duplicated matches
// diego             - 19-08-2019 - us89 - Send new prop (currentUserAdversary) to items on the matches list to determine what adversary
//                                         the user is (adversary1 or adversary2) necessary to upload results
// diego             - 09-08-2019 - bug4 - Remove child_changed listener
//                                         + update remove listener methods on willBlur
// diego             - 06-08-2019 - us75 - matchesRef changed to matchesPlayRef
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import MatchCardList from '../../components/MatchCard/MatchCardList';
import { matchesPlayRef, getUserNameWithUID, getGamerTagWithUID, getUserDiscordTag } from '../../services/database';
import { ADVERSARY_1_NUMBER, ADVERSARY_2_NUMBER } from '../../utilities/Constants';

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
                'willBlur',
                (payload) => {
                    /**
                     * Remove the listeners on matchesPlayRef and clean the state
                     * as we use the child_added and child_removed listeners
                     * we need to remove it one by one
                     */
                    matchesPlayRef.orderByChild('adversary1').equalTo(this.props.id).off('child_added');
                    matchesPlayRef.orderByChild('adversary2').equalTo(this.props.id).off('child_added');
                    matchesPlayRef.orderByChild('adversary1').equalTo(this.props.id).off('child_removed');
                    matchesPlayRef.orderByChild('adversary2').equalTo(this.props.id).off('child_removed');
                    this.setState({ matches: [] });
                }
            ),

            /**
             * This event is triggered when the user enter (focus) on this screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    /**
                     * Listen to childs_added for matches where te adversary1 is the current user (the user is the creator of the match)
                     */
                    matchesPlayRef.orderByChild('adversary1').equalTo(this.props.id).on('child_added', async (hostedMatches) => {
                        if (hostedMatches.val().adversary2 !== '') {
                            //Take the necesary information from the object returned of the database
                            const {
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
                                pickResult1,
                                hourResult
                            } = hostedMatches.val();

                            let userName = '';
                            let gamerTag = '';
                            let discordTag = '';
                            try {
                                userName = await getUserNameWithUID(hostedMatches.val().adversary2);
                                gamerTag = await getGamerTagWithUID(hostedMatches.val().adversary2, hostedMatches.val().game, hostedMatches.val().platform);
                                discordTag = await getUserDiscordTag(adversary2);
                            } catch (error) {
                                console.error(error);
                            }

                            //Object with the necesary fields to load the match in the app (the card and the detailed view)
                            const matchObject = {
                                adversaryUid: adversary2,
                                /**
                                 * currentUserAdversary is a number value that means what adversary is the current user on the match
                                 * if the user is the author (creator) of the match, is the adversary1, if not, is the adversary2, and
                                 * that information is important when their result is uploaded
                                 */
                                currentUserAdversary: ADVERSARY_1_NUMBER,
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
                                pickResult1,
                                hourResult,
                                userName,
                                gamerTag,
                                discordTag
                            };
                            this.setState((state) => {
                                //Add the matchObject to the matches array of the state
                                const matches = [...state.matches, matchObject];
                                return { matches };
                            });
                        }
                    });

                    /**
                     * Listen to childs_added for matches where te adversary2 is the current user (other user has accepted a challenge from the current user)
                     */
                    matchesPlayRef.orderByChild('adversary2').equalTo(this.props.id).on('child_added', async (challengedMatches) => {
                        //Take the necesary information from the object returned of the database
                        const {
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
                            pickResult2,
                            hourResult
                        } = challengedMatches.val();

                        let userName = '';
                        let gamerTag = '';
                        let discordTag = '';
                        try {
                            userName = await getUserNameWithUID(challengedMatches.val().adversary1);
                            gamerTag = await getGamerTagWithUID(challengedMatches.val().adversary1, challengedMatches.val().game, challengedMatches.val().platform);
                            discordTag = await getUserDiscordTag(adversary1);
                        } catch (error) {
                            console.error(error);
                        }

                        //Object with the necesary fields to load the match in the app (the card and the detailed view)
                        const matchObject = {
                            adversaryUid: adversary1,
                            currentUserAdversary: ADVERSARY_2_NUMBER,
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
                            pickResult2,
                            hourResult,
                            userName,
                            gamerTag,
                            discordTag
                        };
                        this.setState((state) => {
                            //Add the matchObject to the matches array of the state
                            const matches = [...state.matches, matchObject];
                            return { matches };
                        });
                    });

                    /**
                     * Listen for deleted matches where the current user is the adversary1
                     */
                    matchesPlayRef.orderByChild('adversary1').equalTo(this.props.id).on('child_removed', (removedPublicMatch) => {
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

                    /**
                     * Listen for deleted matches where the current user is the adversary2
                     */
                    matchesPlayRef.orderByChild('adversary2').equalTo(this.props.id).on('child_removed', (removedPublicMatch) => {
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
        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <MatchCardList matchesPlay {...this.state} />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    /**
     * Check if user object (in redux) contains data (when a user is not logged
     * or a user make signout their redux object is empty)
     */
    if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('id')) {
        return {
            id: state.userReducer.user.id
        };
    }
    return { id: '' };
}

export default MyMatchesScreen = connect(mapStateToProps)(MyMatchesScreen);
