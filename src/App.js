import React, {useEffect} from 'react'
import {NavLink, Switch, Route, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './Components/Header'
import Login from './Components/Login'
import ShopContainer from './Components/ShopContainer'
import UsersContainer from './Components/UsersContainer'
import Profile from './Components/Profile'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/shops">
          <ShopContainer />
        </Route>
        <Route exact path ="/users">
          <UsersContainer />
        </Route>
        <Route exact path="/profile/:id">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
