import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import axios from 'axios';
import New from './components/New';
import View from './components/View';

const App = () => {

  const handleInput = (event) => {
    // setState({ ...state, [event.target.name]: event.target.value })
  }

  return (
    <div className="body">
      <Switch>
        <Route
          path="/new"
          render={() => {
            return(
              <New
                // handleInput={handleInput}
              />
            )
          }}
        />
        <Route
          path="/view"
          render={() => {
            return(
              <View/>
            )
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
