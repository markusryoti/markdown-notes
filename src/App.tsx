import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TextArea from './components/TextArea';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={TextArea} />
      </Switch>
    </Router>
  );
}
