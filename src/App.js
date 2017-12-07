import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ScatterPlot from './scatterplot';

const plotpoints = [
  {
  "start_time": "2017-11-29T04:56:12Z",
  "status": "pass",
  "duration": 126, // in seconds
  },
  {
  "start_time": "2017-11-28T03:22:12Z",
  "status": "error",
  "duration": 205,
  },
  {
  "start_time": "2017-11-28T02:24:12Z",
  "status": "fail",
  "duration": 20,
  },
  {
  "start_time": "2017-11-28T05:24:12Z",
  "status": "pass",
  "duration": 90,
  },
  {
  "start_time": "2017-11-29T06:24:12Z",
  "status": "error",
  "duration": 90,
  },
  {
  "start_time": "2017-11-28T14:12:12Z",
  "status": "pass",
  "duration": 200,
  },

  {
    "start_time": "2017-12-04T04:12:12Z",
    "status": "fail",
    "duration": 100,

  }
  ];

class App extends Component {
  render() {
    return (
      <ScatterPlot data={plotpoints}/>
    );
  }
}

export default App;
