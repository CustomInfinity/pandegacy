import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CityTracker from './modules/city-tracker';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <CityTracker/>
      </MuiThemeProvider>
    );
  }
}

export default App;
