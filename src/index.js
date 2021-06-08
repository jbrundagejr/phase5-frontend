import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers} from 'redux'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import 'semantic-ui-css/semantic.min.css'

let initialStateOfUserReducer = {
  username: "",
  id: parseInt(""),
  token: ""
}

function userReducer(state = initialStateOfUserReducer, action){
  switch(action.type){
    case "SET_USER_INFO":
      return{
        ...state,
        username: action.payload.user.username,
        id: action.payload.user.id,
        token: action.payload.token
      }
    case "LOG_OUT":
      return{
        ...state,
        username: "",
        token: ""
      }
    default:
      return state
  }
}

let allReducers = {
  userInfo: userReducer
  // otherCompInfo: compReducer,
}

let rootReducer = combineReducers(allReducers)

let storeObj = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

ReactDOM.render(
  <BrowserRouter>
    <Provider store={storeObj}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)