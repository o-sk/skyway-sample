import React from 'react';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then( stream => {
      const videoElm = document.getElementById('my-video');
      videoElm.srcObject = stream;
      videoElm.play();
      this.stream = stream;
    }).catch( error => {
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });
  }

  render() {
    return (
      <div className="App">
        <video id="my-video" width="400px" autoPlay muted playsInline></video>
      </div>
    );
  }
}

export default App;
