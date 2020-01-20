import React from 'react'

class NavBar extends React.Component {

  render() {
    return (
      <nav className="nav-wrapper red darken-3">
        <div className="container">
          <a className="brand-logo">Task List</a>
          <ul className="right">
            <li><a href="/">Home</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default (NavBar);