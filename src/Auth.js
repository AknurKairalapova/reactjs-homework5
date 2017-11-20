import React, {Component} from 'react';
import {authorizeUser} from './AuthorizeApi';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    isAuthorized: false,
    attempts: 0
  }

  handleChangeForm = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit = () => {
    const {email, password} = this.state;
    let {attempts} = this.state;
    const isAuthorized = authorizeUser(email, password);

    if (!isAuthorized) {
      attempts += 1;
    }

    this.setState({isAuthorized, attempts: attempts});
  }

  render() {
    const {email, password, isAuthorized, attempts} = this.state;
    
    const redirectToHome = () => {
      if ( isAuthorized ) {
        return <Redirect to="/"/>
      }
    };
    const error = () => {
      if ( attempts > 0 ) {
        return <p className="error">Неправильная почта и/или пароль!</p>
      }
    }

    return (
      <div>
        <input type="text" name="email" value={email} onChange={this.handleChangeForm} />
        <input type="text" name="password" value={password} onChange={this.handleChangeForm} />
        <button type="button" onClick={this.handleSubmit} >Войти</button>

        { error() }
        { redirectToHome() }
      </div>
    );
  }
}

export default Auth;
