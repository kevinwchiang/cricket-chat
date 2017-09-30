import React, { Component } from 'react';

class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
      // chats: [{timestamp: 'jon', text: 'hi'}, { timestamp: 'kevin', text: 'hello' }]
    }
  }

  render() {
    return (
      <div className='chat-box'>
        {this.state.chats.map((message) => {
          return (
            <div className="message">
              <span className="message-timestamp">{message.timestamp}:</span>
              <span className="message-text">{message.text}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Chatbox;