// tests/Leaderboard.test.js
import React from 'react';
import { shallow } from 'enzyme';
import Leaderboard from './Leaderboard';

describe('Leaderboard', () => {
  it('renders leaderboard table', () => {
    const wrapper = shallow(<Leaderboard />);
    expect(wrapper.find('table')).toHaveLength(1);
  });

  it('fetches leaderboard data', async () => {
    const wrapper = shallow(<Leaderboard />);
    await wrapper.instance().fetchLeaders();
    expect(wrapper.state().leaders).toHaveLength(10);
  });
});