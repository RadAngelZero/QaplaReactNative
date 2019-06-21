import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HeaderBar from '../src/components/HeaderBar/HeaderBar';
import App from '../App';

describe('HeaderBar render test', () => {
    let appWrapper;
    beforeEach(() => {
      appWrapper = shallow(<App />);
    });
    it('Check if HeaderBar render on app', () => {
        expect(appWrapper.find(HeaderBar)).to.exist;
    });
});