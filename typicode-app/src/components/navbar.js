import React from 'react';

class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container">
          <span className="navbar-brand">UMBRELLACORP</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto"></ul>
            <form className="form-inline mt-2 mt-md-0 mr-sm-2 mb-0 mb-sm-3 mb-md-0" onSubmit={ this.props.onSearch }>
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
            </form>
            <button className="btn btn-secondary my-2 my-sm-0" onClick={ this.props.onLogout } >SIGN OUT</button>
          </div>
        </div>
      </nav>
    );
  }

}

export default Navbar;
