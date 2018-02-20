import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: "Diego", messages:[{user: 'Bob', message: 'Testing'}] };
  }

  handleNewUser = (user) => {
    console.log("handleNewUser <App />");
    // const newMessage = [...this.state.messages, message]
    this.setState({ currentUser: user })
  }

  handleNewMessage = (message) => {
    console.log("handleNewMessage <App />");
    // const newMessage = [...this.state.messages, message]
    const newMessage = { user: this.state.currentUser, message: message };
    const messages = this.state.messages.concat(newMessage)
    this.setState({ messages: messages })
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = { user: "Michelle", message: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }, 3000);
  }
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar  
          handleNewUser={this.handleNewUser}
          handleNewMessage={this.handleNewMessage} 
          currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
