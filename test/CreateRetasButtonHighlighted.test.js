import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import CreateRetasButton from '../src/components/CreateRetasButton/CreateRetasButton';

describe('HeaderBar render test', () => {
    let createRetasWrapper;
    beforeEach(() => {
      createRetasWrapper = shallow(<CreateRetasButton highlighted onPress={() => console.log('press')} />);
    });
    it('Check TouchableWithoutFeedback', () => {
        expect(createRetasWrapper.find(TouchableWithoutFeedback)).to.have.lengthOf(1);
    });
    it('Test highlightedExterior view', () => {
        expect(createRetasWrapper.findWhere(node => node.prop('testID') === 'exteriorView')).to.have.lengthOf(1);
    });
    it('Test highlightedInterior view', () => {
        expect(createRetasWrapper.findWhere(node => node.prop('testID') === 'interiorView')).to.have.lengthOf(1);
    });
    it('Test buttonContainer view', () => {
      expect(createRetasWrapper.findWhere(node => node.prop('testID') === 'buttonContainer')).to.have.lengthOf(1);
    });
    it('Test button text', () => {
        expect(createRetasWrapper.findWhere(node => node.prop('testID') === 'buttonText')).to.have.lengthOf(1);
    });
});