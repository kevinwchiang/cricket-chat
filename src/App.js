import React, { Component } from 'react';
import Chat from './Chat';

class App extends Component {
  render() {
    return (
      <div id="app">
        <div id="header">
          <img src="https://cdn.crickethealth.com/1/img/logos/logo-lg-peach.svg" />
        </div>
        <Chat />
      </div>
    );
  }
}

export default App;
