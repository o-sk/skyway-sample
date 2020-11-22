import React from 'react';
import { Link } from 'react-router-dom'
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h1 className="Head">Skyway sample</h1>
        <ul>
          <li className="SampleList">
            <Link to="/p2p">P2P</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;