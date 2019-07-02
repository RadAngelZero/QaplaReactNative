import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HeaderBar from '../src/components/HeaderBar/HeaderBar';
import PublicMatchesFeedScreen from '../src/screens/PublicMatchesFeedScreen/PublicMatchesFeedScreen';

describe('HeaderBar render test', () => {
    let appWrapper;
    beforeEach(() => {
      appWrapper = shallow(<PublicMatchesFeedScreen />);
    });
    it('Check if HeaderBar render on app', () => {
        expect(appWrapper.find(HeaderBar)).to.exist;
    });
});