import React, {useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Header from './Components/Header'
import Login from './Components/Login'
import FlavorContainer from './Components/FlavorContainer'
import FlavorModal from './Components/FlavorModal'
import UsersContainer from './Components/UsersContainer'
import Profile from './Components/Profile'
import ConversationContainer from './Components/ConversationContainer'
import Conversation from './Components/Conversation'

function App() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    if(localStorage.token){
      fetch("http://localhost:3000/keep_logged_in", {
        method: "GET",
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(res => res.json())
      .then(resp => {
        if(resp.token){
          dispatch({type: "SET_USER_INFO", payload: resp})
        }
      })
    }
  }, [dispatch])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/flavors">
          <FlavorContainer />
        </Route>
        <Route exact path="/flavors/:id">
          <FlavorModal />
        </Route>
        <Route exact path ="/users">
          <UsersContainer />
        </Route>
        <Route exact path="/profile/:id">
          <Profile />
        </Route>
        <Route exact path="/conversations">
          <ConversationContainer />
        </Route>
        <Route exact path="/conversations/:id">
          <Conversation />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
