import React from 'react';
import { View } from 'react-native';

import { shallow } from 'enzyme';
import { assert } from 'chai';

import Carousel from '../src/components/Carousel/Carousel';


describe('Carousel render test', () => {
    let CarouselWrapper;
    beforeEach(() => {
      cw = shallow(<Carousel />);
    });
    it('Check if carousel has property of width', () => {
        assert.property(cw, 'width');
    });
    it('Check if carousel has property of height', () => {
        assert.property(cw, 'height');
    });
    // it('Test Container was rendered succesfully', () => {
    //     expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'container')).to.have.lengthOf(1);
    // });
    // it('Test Button for notification icon was rendered succesfully', () => {
    //   expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'NotificationButton')).to.have.lengthOf(1);
    // });
    // it('Test notification icon was rendered succesfully', () => {
    //     expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'NotificationIcon')).to.have.lengthOf(1);
    // });
    // it('Test text container was rendered succesfully', () => {
    //     expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'textContainer')).to.have.lengthOf(1);
    // });
    // it('Test text was rendered succesfully', () => {
    //     expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'text')).to.have.lengthOf(1);
    // });
    // it('Test invisible view was rendered succesfully', () => {
    //     expect(HeaderBarWrapper.findWhere(node => node.prop('testID') === 'invisibleView')).to.have.lengthOf(1);
    // });
});