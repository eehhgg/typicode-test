import React from 'react';
import './login.css';
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
      <div className="section-signin">
        <h1 className="h3 mb-3 font-weight-normal">UMBRELLACORP</h1>
        <form onSubmit={ this.onSubmit }>
          { this.state.error && <div className="error">{ this.state.error }</div> }
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input id="inputUsername" className="form-control" name="username" type="text" maxLength="40" required autoFocus placeholder="Username" value={ this.state.username } onChange={ this.handleInputChange } />
          <label htmlFor="inputEmail" className="sr-only">Email</label>
          <input id="inputEmail" className="form-control" name="email" type="email" maxLength="40" required placeholder="Email" value={ this.state.email } onChange={ this.handleInputChange } />
          <button className="btn btn-md" type="submit">SIGN IN</button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    document.getElementById('page-body').className = 'body-signin';
  }

  componentWillUnmount() {
    document.getElementById('page-body').className = '';
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
        this.props.onLogin(user);

      })
      .catch(error => {
        this.setState({ error: 'An error occurred.' });
      });
  }

}

export default Login
