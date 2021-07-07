import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
import New from './components/New';
import View from './components/View';
import Login from './components/Login';
import Denied from './components/Denied';
import Navbar from './components/Navbar';


const App = () => {

  const [activePage, setActivePage] = useState('none');

  return (
    <div className="body">
      <Navbar
        activePage={activePage}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return(
              <Redirect to="/view" />
            )
          }}
        />
        <Route
          path="/new"
          render={() => {
            setActivePage('new');
            return(
              <New />
            )
          }}
        />
        <Route
          path="/view"
          render={() => {
            setActivePage('view');
            return(
              <View />
            )
          }}
        />
        <Route
          path="/login"
          render={() => {
            setActivePage('login')
            return(
              <Login />
            )
          }}
        />
        <Route
          path="/denied"
          render={() => {
            setActivePage('none')
            return(
              <Denied />
            )
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
