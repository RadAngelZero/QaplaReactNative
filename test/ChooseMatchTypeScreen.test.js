import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import ChooseMatchTypeScreen from '../src/screens/ChooseMatchTypeScreen/ChooseMatchTypeScreen';

describe('ChooseMatchTypeScreen render test', () => {
    let ChooseMatchTypeScreenWrapper;
    beforeEach(() => {
      ChooseMChooseMatchTypeScreenWrapper = shallow(<ChooseMatchTypeScreen />);
    });
    it('Check View`s', () => {
        expect(ChooseMatchTypeScreenWrapper.find(View)).to.have.lengthOf(5);
    });
    it('Check Text`s', () => {
        expect(ChooseMatchTypeScreenWrapper.find(Text)).to.have.lengthOf(3);
    });
    it('Check Text`s', () => {
        expect(ChooseMatchTypeScreenWrapper.find(Text)).to.have.lengthOf(3);
    });
    it('Check Text`s content', () => {
        expect(SignInScreenWrapper.text()).to.match('Escoge un tipo de reta');
        expect(SignInScreenWrapper.text()).to.match('RETA PÚBLICA');
        expect(SignInScreenWrapper.text()).to.match('RETAR USUARIO');
    });
    it('Check TouchableWithoutFeedback`s', () => {
        expect(ChooseMatchTypeScreenWrapper.find(TouchableWithoutFeedback)).to.have.lengthOf(2);
    });
});