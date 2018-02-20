import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

    getMessage() {
        return this.props.messages.map((message, index) => (
            <Message key={index} message={message} />
        ));
    }

    render() {
        console.log("Rendering <MessageList/>");
        return (
            <main className="messages">
                {this.getMessage()}
                <div className="message system">
                </div>
            </main> 

        );
    }
}
export default MessageList;