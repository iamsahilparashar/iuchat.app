import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <Router>
        <Route exact path="/">
            <Join />
        </Route>
        <Route path="/chat">
            <Chat  />
        </Route>
    </Router>
);


export default App;