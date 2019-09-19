import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import SignInScreen from '../src/screens/SignInScreen/SignInScreen';

describe('SignInScreen render test', () => {
    let SignInScreenWrapper;
    beforeEach(() => {
        SignInScreenWrapper = shallow(<SignInScreen />);
    });
    it('Check views of the component', () => {
        expect(SignInScreenWrapper.find(View)).to.to.have.lengthOf(6);
    });
    it('Check image of the component', () => {
        expect(SignInScreenWrapper.find(Image)).to.to.have.lengthOf(1);
    });
    it('Check TouchableWithoutFeedback of the component', () => {
        expect(SignInScreenWrapper.find(TouchableWithoutFeedback)).to.to.have.lengthOf(2);
    });
    it('Check Text of the component', () => {
        expect(SignInScreenWrapper.find(Text)).to.to.have.lengthOf(4);
    });
    it('Check content text of the text components', () => {
        expect(SignInScreenWrapper.text()).to.match('Continuar con Facebook');
        expect(SignInScreenWrapper.text()).to.match('Continuar con Google');
        expect(SignInScreenWrapper.text()).to.match('¿Ya tienes cuenta?');
        expect(SignInScreenWrapper.text()).to.match('Ingresa con correo');
    });
});