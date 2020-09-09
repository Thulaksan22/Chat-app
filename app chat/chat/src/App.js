import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";
import Login from "./Composents/Login";


// function randomName() {
//   const prenoms = ["Johnathan", "Joeseph", "Jotaro", "Josuke", "Giorno"];
//   const noms = ["Joestar", "Zeppeli", "Irene", "Stroheim", "Smokey"];
//   const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
//   const nom = noms[Math.floor(Math.random() * noms.length)];
//   return prenom + " " + nom;
// }

function randomName() {
  // const prenoms = {state.userText};
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: "",
      color: randomColor()
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("rov3xqZbCQ3145ZM", {
      data: this.state.member
    });
    this.drone.on('open', error =>{
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
      const room = this.drone.subscribe("observable-room");
      room.on('data', (data, member) =>{
        const messages = this.state.messages;
        messages.push({member, text: data});
        this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Mon chat App</h1>
        </div>
        <Login />
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input 
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  };

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

  // setUsername = (props) => {
  //   {props.username}
  // } 
}


export default App;