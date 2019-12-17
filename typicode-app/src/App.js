import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Login from './components/login';
import Posts from './components/posts';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <div>
        { !this.state.user &&
          <Login onLogin={ this.onLogin } /> }
        { this.state.user &&
          <div>
            <Navbar onLogout={ this.onLogout } onSearch={ this.onSearch } />
            <Posts userId={ this.state.user.id } />
          </div>
        }
      </div>
    );
  }

  onLogin(user) {
    this.setState({
      user: user
    });
  }

  onLogout() {
    this.setState({
      user: null
    });
  }

  onSearch(e) {
    e.preventDefault();
  }

}

export default App;
