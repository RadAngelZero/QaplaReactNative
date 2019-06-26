import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { View } from 'react-native';
import PublicMatchesFeedScreen from '../src/screens/PublicMatchesFeedScreen/PublicMatchesFeedScreen';
import MatchCardList from '../src/components/MatchCard/MatchCardList';

/**
 * Before running comment line 5 (imports related to firebase)
 */
describe('PublicMatchesFeedScreen render test', () => {
    let PublicMatchesFeedScreenWrapper;
    beforeEach(() => {
        const navigation = { addListener: () => console.log('Flag to avoid test error') };
        PublicMatchesFeedScreenWrapper = shallow(<PublicMatchesFeedScreen navigation={navigation} />);
    });
    it('Check view of the component', () => {
        expect(PublicMatchesFeedScreenWrapper.find(View)).to.to.have.lengthOf(1);
    });
    it('Check MatchCardList of the component', () => {
        expect(PublicMatchesFeedScreenWrapper.find(MatchCardList)).to.to.have.lengthOf(1);
    });
});