import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { View } from 'react-native';
import { MyMatchesScreen } from '../src/screens/MyMatchesScreen/MyMatchesScreen';
import MatchCardList from '../src/components/MatchCard/MatchCardList';

describe('PublicMatchesFeedScreen render test', () => {
    let PublicMatchesFeedScreenWrapper;
    beforeEach(() => {
        const navigation = { addListener: () => console.log('Flag to avoid test error') };
        PublicMatchesFeedScreenWrapper = shallow(<MyMatchesScreen navigation={navigation} id='1' />);
    });
    it('Check view of the component', () => {
        expect(PublicMatchesFeedScreenWrapper.find(View)).to.to.have.lengthOf(1);
    });
    it('Check MatchCardList of the component', () => {
        expect(PublicMatchesFeedScreenWrapper.find(MatchCardList)).to.to.have.lengthOf(1);
    });
});