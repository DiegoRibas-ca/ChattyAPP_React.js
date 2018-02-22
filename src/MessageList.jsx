import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    // scroll the screen to follow as you send a lot of messages 
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    getMessage() {
        return this.props.messages.map((message) => {
            // console.log('MessaList console',message);
            if (message.type === "incomingMessage" || message.type === "incomingImage" ) {
                console.log('sending to message')
               return <Message key={message.id} message={message} />
            } else if (message.type === "incomingNotification" ) {
                return (
                <div key={message.id} className="message system">
                    {message.content}
                </div>)
            }
        });
    }

    render() {
        console.log("Rendering <MessageList/>");
        return (
            <main className="messages">
                {this.getMessage()}

            </main> 

        );
    }
}
export default MessageList;