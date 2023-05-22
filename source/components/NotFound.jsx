import React, { Component } from 'react';
import Header from './Header';
import '../styles/NotFound.css';

class NotFound extends Component {
  render () {
    return (
      <div className="not-found">
        <Header />

        <h1 className="not-found-title" >Page not found.</h1>
      </div>
    );
  }
}

export default NotFound;
