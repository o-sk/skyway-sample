import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const P2P = lazy(() => import('./P2P'));

class App extends React.Component {
  render() {
    return (
      <Router basename="skyway-sample">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/p2p" component={P2P}/>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
