import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { View, Image, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import LoginWithEmailScreen from '../src/screens/LoginWithEmailScreen/LoginWithEmailScreen';

describe('SignInScreen render test', () => {
    let LogInScreenWrapper;
    beforeEach(() => {
        LogInScreenWrapper = shallow(<LoginWithEmailScreen />);
    });
    it('Check views of the component', () => {
        expect(LogInScreenWrapper.find(View)).to.to.have.lengthOf(4);
    });
    it('Check image of the component', () => {
        expect(LogInScreenWrapper.find(Image)).to.to.have.lengthOf(1);
    });
    it('Check TouchableWithoutFeedback of the component', () => {
        expect(LogInScreenWrapper.find(TouchableWithoutFeedback)).to.to.have.lengthOf(1);
    });
    it('Check Text of the component', () => {
        expect(LogInScreenWrapper.find(Text)).to.to.have.lengthOf(2);
    });
    it('Check TextInput of the component', () => {
        expect(LogInScreenWrapper.find(TextInput)).to.to.have.lengthOf(2);
    });
    it('Check content text of the text components', () => {
        expect(LogInScreenWrapper.text()).to.match('¿Olvidaste tu contraseña?');
        expect(LogInScreenWrapper.text()).to.match('INICIAR SESION');
    });
});