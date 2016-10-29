import React, { Component } from 'react';
// import logo from '../../assets/logo.svg';
import './styles.css'
import BarChart from '../BarChart'
import Visitors from '../Visitors'
import DonutChart from '../DonutChart'
import ProgressChart from '../ProgressChart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <BarChart />
          <Visitors />
          <div className="pad bottom-left-svg">
            <DonutChart padAngle={0.03}/>
          </div>
          <ProgressChart />
        </div>
      </div>
    );
  }
}

export default App;
