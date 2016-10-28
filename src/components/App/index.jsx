import React, { Component } from 'react';
// import logo from '../../assets/logo.svg';
import './styles.css'
// import BarChart from '../BarChart'
import Visitors from '../Visitors'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<BarChart />*/}
          <Visitors />
        </div>
      </div>
    );
  }
}

export default App;
