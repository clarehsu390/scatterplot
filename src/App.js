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

  },
  {
    "start_time": "2017-12-03T04:12:12Z",
    "status": "pass",
    "duration": 50,

  },

  {
    "start_time": "2017-11-30T04:12:12Z",
    "status": "fail",
    "duration": 70,

  },
  {
    "start_time": "2017-12-01T04:12:12Z",
    "status": "pass",
    "duration": 100,

  },
  {
    "start_time": "2017-12-02T14:24:20Z",
    "status": "error",
    "duration": 10,

  },
  {
    "start_time": "2017-12-04T12:16:40Z",
    "status": "pass",
    "duration": 30,

  },
  {
    "start_time": "2017-12-04T11:29:13Z",
    "status": "fail",
    "duration": 120,
  },
  {
    "start_time": "2017-12-01T23:40:12Z",
    "status": "pass",
    "duration": 100,

  }, 
  {
    "start_time": "2017-11-29T13:40:12Z",
    "status": "pass",
    "duration": 60,

  }, 
  {
    "start_time": "2017-12-02T15:50:12Z",
    "status": "error",
    "duration": 250,

  },
  {
    "start_time": "2017-11-30T10:29:12Z",
    "status": "pass",
    "duration": 220,

  },
  {
    "start_time": "2017-12-01T23:40:12Z",
    "status": "pass",
    "duration": 100,

  },
  {
    "start_time": "2017-11-30T18:49:12Z",
    "status": "error",
    "duration": 80,

  },
  {
    "start_time": "2017-12-03T21:14:12Z",
    "status": "fail",
    "duration": 200,

  },
  {
    "start_time": "2017-12-04T01:40:12Z",
    "status": "pass",
    "duration": 170,

  },
  {
    "start_time": "2017-12-02T17:19:12Z",
    "status": "pass",
    "duration": 70,

  }, 
  ];

class App extends Component {
  render() {
    return (
      <ScatterPlot data={plotpoints}/>
    );
  }
}

export default App;
