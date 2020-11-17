import React from 'react';
import Peer from 'skyway-js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStream: null,
      myId: "",
      theirId: "",
    };
    this.peer = new Peer({
      key: process.env.REACT_APP_SKYWAY_API_KEY,
      debug: 3
    });
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

    this.peer.on('open', () => {
      this.setState({myId: this.peer.id})
    });
    this.peer.on('call', mediaConnection => {
      mediaConnection.answer(this.state.localStream);
      this.setEventListener(mediaConnection);
    });
  }

  makeCall() {
    const mediaConnection = this.peer.call(this.state.theirId, this.state.localStream);
    this.setEventListener(mediaConnection);
  }

  setEventListener = (mediaConnection) => {
    mediaConnection.on('stream', stream => {
      const videoElm = document.getElementById('their-video')
      videoElm.srcObject = stream;
      videoElm.play();
    });
  }

  handleChangeTheirId = (event) => {
    this.setState({theirId: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <h1 className="Head">Skyway sample</h1>
        <div className="Container">
          <div className="MyVideo">
            <video id="my-video" width="400px" autoPlay muted playsInline></video>
            <p>MyID: {this.state.myId}</p>
            <div>
              <input type="text" value={this.state.theirId} onChange={this.handleChangeTheirId} />
              <button onClick={() => this.makeCall()}>発信</button>
            </div>
          </div>
          <div className="TheirVideo">
            <video id="their-video" width="400px" autoPlay playsInline></video>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
