import React from 'react'
import ApiService from '../shared/api-service';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.apiService = new ApiService();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      email: '',
      error: ''
    };
  }

  render() {
    return (
      <form onSubmit={ this.onSubmit }>
        { this.state.error && <div className="text-danger">{ this.state.error }</div> }
        <input value={ this.state.username } name="username" type="text" maxLength="40" required placeholder="Username" onChange={ this.handleInputChange } />
        <input value={ this.state.email } name="email" type="email" maxLength="40" required placeholder="Email" onChange={ this.handleInputChange } />
        <button type="submit">SIGN IN</button>
      </form>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      error: ''
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.apiService.getUser(this.state.username)
      .then(user => {

        if (!user || !user.email) {
          this.setState({ error: 'The user was not found.' });
          return;
        }
        if (user.email !== this.state.email) {
          this.setState({ error: 'The user and the email do not match.' });
          return;
        }

        this.setState({
          username: '',
          email: '',
          error: ''
        });
        this.props.onLogin({ user: user });

      })
      .catch(error => {
        this.setState({ error: 'An error occurred.' });
      });
  }

}

export default Login
