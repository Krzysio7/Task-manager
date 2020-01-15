import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TaskList from './scenes/TaskList';
import { NavBar } from './components';
import UserCard from './components/UserCard';


class App extends React.Component {

  render() {

    return (
      <div className="App" style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <NavBar />
        <Router>
          <div >
            <Route exact path="/" component={TaskList} />
            <Route exact path="/user/:userId" component={UserCard} />
          </div>
        </Router>
      </div>

    );
  }
}

export default App;
