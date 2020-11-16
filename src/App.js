import React from 'react';
import Peer from 'skyway-js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStream: null,
      myId: null,
    };
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then( stream => {
      const videoElm = document.getElementById('my-video');
      videoElm.srcObject = stream;
      videoElm.play();
      this.setState({localStream: stream})
    }).catch( error => {
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });

    const peer = new Peer({
      key: process.env.REACT_APP_SKYWAY_API_KEY,
      debug: 3
    });
    peer.on('open', () => {
      this.setState({myId: peer.id})
    });
  }

  render() {
    return (
      <div className="App">
        <video id="my-video" width="400px" autoPlay muted playsInline></video>
        <p id="my-id">{this.state.myId}</p>
      </div>
    );
  }
}

export default App;
