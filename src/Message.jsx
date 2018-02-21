import React, { Component } from 'react';

class Message extends Component {

    render() {
        console.log("Rendering <Message/>");
        return (
            <div className="message">
                <span className="message-username">{this.props.message.user}</span>
                <span className="message-content">{this.props.message.message} </span>
                {/* I won't be impressed with technology until I can download food. */}
            </div>
        );
    }
}
export default Message;