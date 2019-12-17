import React from 'react';
import './App.css';
import Login from './components/login';
import Posts from './components/posts';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <div>
        { !this.state.user && <Login onLogin={ user => this.onLogin(user) } /> }
        { this.state.user &&
          <div>
            <button onClick={ this.onLogout }>SIGN OUT</button>
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

}

export default App;
