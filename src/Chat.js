import React, { Component } from 'react';
import Chatbox from './Chatbox';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    }
    this.handleSubmit = ::this.handleSubmit;
    this.onChange = ::this.onChange;
  }

  componentDidMount() {
    // Create Websocket connection
    this.socket = new WebSocket('ws://localhost:8081');

    // Connection opened
    this.socket.addEventListener('open', (event) => {
        this.socket.send('initial');
    });

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  onChange(text) {
    this.setState({ inputText: text })
  }

  handleSubmit() {
    this.socket.send(this.state.inputText);
    this.setState({ inputText: '' });
  }

  render() {
    return (
      <div className="chat-container">
        <div className="chat">
          <Chatbox />
          <form className="input-container" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="chat-input form-control"
              onChange={(event) =>this.onChange(event.target.value)}
              value={this.state.inputText}
            />
            <input
              type="submit"
              value="Send"
              className="btn btn-default chat-button"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
