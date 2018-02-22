import React, { Component } from 'react';

class Message extends Component {

    
    render() {
        console.log("Rendering <Message/>");
        const userColor = this.props.message.colour
        const style = {color: `${userColor}`}
        return (
            <div className="message">
                <span style={style} className="message-username">{this.props.message.user}</span>
                <span className="message-content">{this.props.message.message} </span>
                {/* I won't be impressed with technology until I can download food. */}
            </div>
        );
    }
}
export default Message;