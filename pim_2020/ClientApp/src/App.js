import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes/routes';
import history from '../src/server/history';

import '../src/assets/styles/global.css';




export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          

          <Router history={history}>
              <Routes />
              <ToastContainer autoClose={3000} className="toast-container" />
          </Router>                    
             
          
    );
  }
}
