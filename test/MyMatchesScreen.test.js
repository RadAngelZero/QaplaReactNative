import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { View, Text } from 'react-native';
import MyMatchesScreen from '../src/screens/MyMatchesScreen/MyMatchesScreen';

describe('MyMatchesScreen render test', () => {
    let MyMatchesScreenWrapper;
    beforeEach(() => {
        MyMatchesScreenWrapper = shallow(<MyMatchesScreen />);
    });
    it('Check view of the component', () => {
        expect(MyMatchesScreenWrapper.find(View)).to.to.have.lengthOf(1);
    });
    it('Check MatchCardList of the component', () => {
        expect(MyMatchesScreenWrapper.find(Text)).to.to.have.lengthOf(1);
    });
});