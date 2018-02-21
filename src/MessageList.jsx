import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

    getMessage() {
        return this.props.messages.map((message) => {
            console.log('MessaList console',message);
            if (message.type === "incomingMessage" ) {
               return <Message key={message.id} message={message} />
            } else if (message.type === "incomingNotification" ) {
                return (<div key={message.id} className="message system">
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