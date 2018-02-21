import React, { Component } from 'react';

class ChatBar extends Component {

    changeUser = (event) => {
        if (event.key === 'Enter') {
            this.props.handleNewUser(event.target.value);
        }
    }   
    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.handleNewMessage(event.target.value);
            event.target.value = "";
        }
    }

    render() {
        console.log("Rendering <ChatBar/>");
        return (
            <footer className="chatbar">
                <input 
                    onKeyPress={this.changeUser} 
                    className="chatbar-username" 
                    placeholder="Your Name (Optional)" 
                    defaultValue={this.props.currentUser} />
                <input 
                    onKeyPress={this.onKeyPress} 
                    className="chatbar-message" 
                    placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}
export default ChatBar;

