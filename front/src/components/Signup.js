import React, {Component} from 'react';
import { signup } from '../api';

export default class Signup extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let username = this.username.value;
    let password = this.password.value;
    signup({username, password}).then(response => {
      if (response.data.code === 0) {
        this.props.history.push('/user');
        let {token} = response.data.data;
        localStorage.setItem('jtoken', token);
      }
    })
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名 <input ref={input => this.username = input} type="text"/>
        密码 <input ref={input => this.password = input} type="text"/>
        <input type="submit" value={'注册'}/>
      </form>
    )
  }
}