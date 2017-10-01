import React, { Component } from 'react';
import Chatbox from './Chatbox';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      chatData: [],
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
      const data = JSON.parse(event.data);
      console.log("Message from server: ", data)
      this.setState({ chatData: data });
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
          <Chatbox chatData={this.state.chatData} />
          <div className="input-container">
            <input
              type="text"
              className="chat-input form-control"
              onChange={(event) => this.onChange(event.target.value)}
              value={this.state.inputText}
              onKeyDown={(e) => {
                if (e.which === 13) {
                  this.handleSubmit();
                }
              }}
            />
            <input
              type="button"
              value="Send"
              className="btn btn-default chat-button"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
