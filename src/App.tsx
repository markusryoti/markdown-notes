import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainView from './components/MainView';
import { TextProvider } from './context/TextProvider';

export default function App() {
  return (
    <Router>
      <Switch>
        <TextProvider>
          <Route path="/" component={MainView} />
        </TextProvider>
      </Switch>
    </Router>
  );
}
