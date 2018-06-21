import React, {Component} from 'react';
import {signin} from "../api";

export default class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let username = this.username.value;
    let password = this.password.value;
    signin({username, password}).then(response => {
      if (response.code === 0) {
        this.props.history.push('/user');
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名 <input
        type="text"
        ref={input => this.username = input}
      />
        密码 <input
        type="text"
        ref={input => this.password = input}
      />
        <input type="submit" value={'登录'}/>
      </form>
    )
  }
}