import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TaskList from './scenes/TaskList';
import { NavBar } from './components';


class App extends React.Component {

  render() {

    return (
      <div className="App">
        <NavBar />
        <Router>
          <div >
            <Route exact path="/" component={TaskList} />
          </div>
        </Router>
      </div>

    );
  }
}

export default App;
