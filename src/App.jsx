import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';
let randomColor = require('randomcolor');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { numberClients: {}, color: "", currentUser: "Diego", messages:[] };
  }
  
  handleNewUser = (user) => {
    console.log("handleNewUser <App />");
    const newNotification = { type: "postNotification", user: this.state.currentUser, content: `${this.state.currentUser} has changed their name to ${user}` };
    const noteString = JSON.stringify(newNotification)
    this.setState({ currentUser: user })
    this.socket.send(noteString); 
  }
  
  handleNewMessage = (message) => {
    console.log("handleNewMessage <App />");
    let userName = "";
    if (this.state.currentUser === "") {
      userName = 'Anonymous';
    } else {
      userName = this.state.currentUser;
    }
    const newMessage = { type: "postMessage", user: userName, colour: this.state.color, message: message };
    const messageString = JSON.stringify(newMessage)
    this.socket.send(messageString); 
  }
  
  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001")
    
    this.socket.onopen = (event) => {
      let colour = randomColor();
      this.setState({ color: colour })
      console.log('Connected to server')
      }
    this.socket.onmessage = (data) => {
      const dataServer = JSON.parse(data.data)
      console.log('received', dataServer.type)
      switch (dataServer.type) {
        case "incomingMessage":
        // handle incoming message
          const messages = this.state.messages.concat(dataServer)
          this.setState({ messages: messages })
          break;
        case "incomingImage":
          // handle incoming message
          const image = this.state.messages.concat(dataServer)
          this.setState({ messages: image })
          break;
        case "incomingNotification":
        // handle incoming notification
          const notifications = this.state.messages.concat(dataServer)
          this.setState({ messages: notifications })
          break;
        case "currentClients":
          // handle incoming notification
          this.setState({ numberClients: dataServer })
          break;
        default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
      }
    }
    console.log("componentDidMount <App />");

  }
  componentWillUnmount() {
    this.socket.close();
  }
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <Nav numberClients={this.state.numberClients}/>
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

