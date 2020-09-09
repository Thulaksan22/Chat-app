import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import "./Login.css"


class Login extends Component{
  state = {
    userText : ""
  }

  onChange (e) {
    this.setState({userText: e.target.value});
  }

  onSubmit (e) {
    e.preventDefault();
    this.setState({userText: ""});
    this.props.setUsername(this.state.userText);
    console.log(this.state.userText);
  }

render() {
    return (
      <div className="Login">
        <form onSubmit = {e => this.onSubmit(e)}>
          <FormGroup bsSize="large">
            <FormControl
              onChange = {e => this.onChange(e)}
              autoFocus
              type="text"
              placeholder="Username"
              value={this.state.userText}
            />
          </FormGroup>
          <Button block bsSize="large" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;