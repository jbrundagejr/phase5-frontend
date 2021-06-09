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
  token: "",
  users: []
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
    case "SET_USER_ARR":
      return{
        ...state,
        users: action.payload
      } 
    case "LOG_OUT":
      return{
        ...state,
        username: "",
        token: "",
        users: []
      }
    case "DELETE":
      return{
      users: state.users.filter(user => user.id !== action.payload)
      }
    default:
      return state
  }
}

let initialStateOfFlavorReducer = {
  flavors: [],
}

function flavorReducer(state = initialStateOfFlavorReducer, action){
  switch(action.type){
    case "SET_FLAVOR_ARR":
      return {
        ...state,
        flavors: action.payload
      }
    // case "SEARCH_FLAVORS":
    //   return {
    //     ...state,
    //     flavors: action.payload
    //   }
      default:
        return state
  }
}

let initialStateOfShopReducer = {
  shops: [],
}

function shopReducer(state = initialStateOfShopReducer, action){
  switch(action.type){
    case "SET_SHOP_ARR":
      return {
        ...state,
        shops: action.payload
      }
      default:
        return state
  }
}

let allReducers = {
  userInfo: userReducer,
  flavors: flavorReducer,
  shops: shopReducer
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