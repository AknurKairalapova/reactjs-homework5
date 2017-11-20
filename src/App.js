import React, {Component} from 'react';
import './App.css';
import {addListener, removeListener, isAuthorized} from './AuthorizeApi';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home';
import Private from './Private';
import Public from './Public';
import Auth from './Auth';

class App extends Component {
  state = {
    isAuthorized: false
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({isAuthorized});
  };

  render() {
    const {isAuthorized} = this.state;

    const redirectToAuth = () => {
      if ( !isAuthorized ) {
        return <Redirect from="/private" to="/auth"/>
      }
    };
    const redirectToHome = () => {
      if ( !isAuthorized ) {
        return <Redirect from="*" to="/"/>
      }
    };
    const privateRoute = () => {
      if ( isAuthorized ) {
        return <Route path="/private" component={Private} />;
      }
    }

    return (
      <div>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/private">Секретная страница</Link></li>
          <li><Link to="/public">Публичная страница</Link></li>
          <li><Link to="/auth">Войти</Link></li>
        </ul>

        <Switch>
          <Route exact path="/" component={Home} />
          {privateRoute()}
          <Route path="/public" component={Public} />
          <Route path="/auth" component={ Auth } />

          {redirectToAuth()} 
          {redirectToHome()}
        </Switch>
      </div>
    );
  }
}

export default App;
