// josep.sanahuja - 26-08-2019 - us90 - Add CreateRetasButton Highlight
// diego          - 03-09-2019 - us96 - Bug fixed: load duplicated matches
// diego          - 09-08-2019 - bug4 - update remove listener methods on willBlur and make unshift of the new data on array
// josep.sanahuja - 05-08-2019 - us84 - + SafeAreaView
// diego          - 05-08-2019 - us58 - Bug fixed: the matches array was not deleted when willBlur was called
// josep.sanahuja - 08-07-2019 - us83 - + 'userName-creation-scenario' asyncStg flag & 'constructor'

import React, { Component } from 'react';
import { View } from 'react-native'
import style from './style';
import MatchCardList from '../../components/MatchCard/MatchCardList';
import { matchesRef, getUserNameWithUID, getGamerTagWithUID } from '../../services/database';
import CreateRetasButton from '../../components/CreateRetasButton/CreateRetasButton';
import { isUserLogged } from '../../services/auth';
import { storeData, retrieveData } from '../../utilities/persistance';

import {
    HIGHLIGHT_1_CREATE_MATCH
 } from '../../utilities/Constants';

import HighlightModal from '../../components/HighlightModal/HighlightModal'

import { setHg1CreateMatch } from '../../actions/highlightsActions';
import { connect } from 'react-redux';

import { getPercentWidth, getPercentHeight } from '../../utilities/iosAndroidDim';

class PublicMatchesFeedScreen extends Component {
    state = {
        matches: [],
        showHg1Modal: false
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
                     * Add a listener of type child_added. In the first load bring all the
                     * childs of the matches node.
                     * When a new child is added the event is triggered to add the new match
                     * to the state
                     * Reference: https://firebase.google.com/docs/database/web/lists-of-data?hl=es-419
                     */
                    matchesRef.on('child_added', async (newPublicMatch) => {
                        //Take the necesary information from the object returned of the database
                        const {
                            adversary1,
                            alphaNumericIdMatch,
                            bet,
                            date,
                            game,
                            hour,
                            numMatches,
                            observations,
                            platform,
                            timeStamp,
                            winBet
                        } = newPublicMatch.val();
                        //Object with the necesary fields to load the match in the app (the card and the detailed view)
                        const matchObject = {
                            adversaryUid: adversary1,
                            alphaNumericIdMatch,
                            bet,
                            date,
                            game,
                            hour,
                            idMatch: newPublicMatch.key,
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

    componentDidMount() {
        this.checkHighlightsFlags();  

        // console.log('Dimensions height: ' +
        //     12 + ' : ' + getPercentHeight(12)
        // );
        console.log('Dimensions width: ' +
            3 + ' :  ' + getPercentWidth(3) + '\n' +
            18 + ' :  ' + getPercentWidth(18)
        );
    }

    /**
     * @description
     * Perform a serie of function calls after match creation button is pressed.
     */
    onCrearRetaButtonPress = () => {
        // TODO: This if-code block could be removed I think after HIGHLIGHT_1_CREATE_MATCH
        // introduction
        if(!this.props.navigation.getParam('firstMatchCreated')){
            storeData('first-match-created', 'true');
            storeData('userName-creation-scenario', 'CreateFirstMatchFromRetas');
        }

        // If showHg1Modal is enabled then
        if (this.state.showHg1Modal){
            // Mark the HIGHLIGHT_1_CREATE_MATCH flag, that means, that it has been used
            // and it should not show up again.
            this.markHg1();
            
            // Hide HIGHLIGHT_1_CREATE_MATCH Modal
            this.toggleHg1Modal();
        }

        this.props.navigation.navigate(isUserLogged() ? 'ChooseMatchType' : 'SignIn');
    }

    /**
     * @description 
     * Checks Highlights flags stored in AsyncStorage, and evaluates which flags
     * to activate in the component state.
     *
     * TODO Josep Maria 25-08-2019:
     * When adding more highlights in the same screen, think a way to synchronize
     * them via logic in the same screen or may be add that logic to the HighlightModal
     * component which does not make sense right now. Synchronized CreateRetasButton
     * with HeaderBar highlights, using Redux and Flags.
     */
    async checkHighlightsFlags() {
        try {
            // Get the value for the highlight flag stored in AsynStorage.
            const value = await retrieveData(HIGHLIGHT_1_CREATE_MATCH);

            if (value !== null) 
            {
                // There is data stored for the flag, it can be either 'false' or 'true'.
                this.setState({
                    showHg1Modal: JSON.parse(value)
                });
            }
            else
            {    
                // That means there is no value stored for the flag, therefore
                // result should be 'true', meaning the highlight will activate.
                this.setState({
                    showHg1Modal: true
                });
            }
        } catch (error) {
          // Error retrieving flag data
          console.log("[PublicMatchesFeed] {checkHighlightsFlags} - error retrieving flag data : " + value);
        }
    }

    /**
     * @description 
     * Toggles the flag 'showHg1Modal' in the component state. If value is 'true' then it becomes
     * 'false'. If it is 'false' then it becomes 'true'.
     *
     * TODO: Consider in a future to consider if the toggle mecanism is the ideal, instead,
     * of using a setTrue or setFalse mecanism. 
     */
    toggleHg1Modal = () => {
        this.setState({
            showHg1Modal: !this.state.showHg1Modal
        })
    }

    /**
     * @description 
     * Mark the Highlight flag 'HIGHLIGHT_1_CREATE_MATCH' that indicates
     * a highlight for rName of specific user only if that username is not already in use.
     * Flag is stored in AsyncStorage
     */
    markHg1 = async () => {
        // flag in asyncStorage for component purpose
        storeData(HIGHLIGHT_1_CREATE_MATCH, 'false');
        
        // Flag in redux to know when a hg has been completed. Using AsyncStorage
        this.props.setHg1CreateMatch(true);
    }

    render() {
        return (
            <View style={style.container}>
                <MatchCardList {...this.state} /> 
                <HighlightModal 
                    visible={this.state.showHg1Modal}
                    onClose={this.toggleHg1Modal}
                    showDelay={4000}
                    cb1={this.markHg1}
                    header='Crea una Reta'
                    body='Empieza a competir con otros jugadores. Crea tu reta y gana!'>
                    <CreateRetasButton 
                            highlighted={!this.props.navigation.getParam('firstMatchCreated')}
                            onPress={this.onCrearRetaButtonPress}/>
                </HighlightModal>
            </View>  
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setHg1CreateMatch: (value) => setHg1CreateMatch(value)(dispatch)
    };
}

export default connect(null, mapDispatchToProps)(PublicMatchesFeedScreen);

