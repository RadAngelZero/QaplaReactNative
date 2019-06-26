import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HeaderBar from '../src/components/HeaderBar/HeaderBar';
import { View } from 'react-native';

describe('HeaderBar render test', () => {
    let HeaderBarWrapper;
    beforeEach(() => {
      HeaderBarWrapper = shallow(<HeaderBar />);
    });
    it('Check if quantity of views is 4', () => {
        expect(HeaderBarWrapper.find(View)).to.have.lengthOf(4);
    });
    it('Test Container was rendered succesfully', () => {
        expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'container')).to.have.lengthOf(1);
    });
    it('Test Button for notification icon was rendered succesfully', () => {
      expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'NotificationButton')).to.have.lengthOf(1);
    });
    it('Test notification icon was rendered succesfully', () => {
        expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'NotificationIcon')).to.have.lengthOf(1);
    });
    it('Test text container was rendered succesfully', () => {
        expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'textContainer')).to.have.lengthOf(1);
    });
    it('Test text was rendered succesfully', () => {
        expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'text')).to.have.lengthOf(1);
    });
    it('Test invisible view was rendered succesfully', () => {
        expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'invisibleView')).to.have.lengthOf(1);
    });
});