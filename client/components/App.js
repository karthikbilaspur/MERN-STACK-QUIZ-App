// components/App.js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import SocialShare from './SocialShare';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/social-share" component={SocialShare} />
        {/* Other routes */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;