import React, {Component} from 'react';
import { getUser } from "../api";

export default class User extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    getUser().then(result => {
      if (result && result.code === 0) {
        let { user } = result.data;
        this.setState({ user })
      } else if(result) {
        this.props.history.push('/');
      }
    })
  }
  render() {
    return (
      <div>
        欢迎你，{this.state.user.username}
      </div>
    )
  }
}
