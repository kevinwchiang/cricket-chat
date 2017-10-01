import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Chatbox extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.chatData.length !== this.props.chatData.length) {
      const node = ReactDOM.findDOMNode(this.chatBox);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const { chatData } = this.props;
    return (
      <div ref={ref => this.chatBox = ref} className="chat-box">
        {chatData.map((message) => {
          let date = new Date(message.createdAt);
          date = date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
          return (
            <div className="message" key={message.id}>
              <span className="message-timestamp">{date}:</span>
              <span className="message-text">{message.text}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Chatbox;
