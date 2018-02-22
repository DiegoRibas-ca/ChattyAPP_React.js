import React, { Component } from 'react';

class Message extends Component {

    render() {
        console.log("Rendering <Message/>");
        const userColor = this.props.message.colour
        const style = {color: `${userColor}`}
        console.log('hey', this.props.message)
        if (this.props.message.type === "incomingMessage") {
        return (
            <div className="message">
                <span style={style} className="message-username">{this.props.message.user}</span>
                <span className="message-content">{this.props.message.message} </span>
            </div>
            
            )
        } else if (this.props.message.type === "incomingImage") {
            return (
                <div className="message">
                    <span style={style} className="message-username">{this.props.message.user}</span>     
                    <div className="message-image" dangerouslySetInnerHTML={{ __html: this.props.message.message }} />
                </div>
            )}
    };
}
export default Message;