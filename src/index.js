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
  email: "",
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
        email: action.payload.user.email,
        token: action.payload.token
      }
    case "SET_USER_ARR":
      return{
        ...state,
        users: action.payload
      } 
    case "UPDATE_USER_INFO":
      return{
        ...state,
        username: action.payload.username,
        email: action.payload.email
      }
    case "LOG_OUT":
      return{
        ...state,
        username: "",
        id: "",
        token: "",
        users: []
      }
    default:
      return state
  }
}

let initialStateOfFlavorReducer = {
  flavors: [],
  flavor: {}
}

function flavorReducer(state = initialStateOfFlavorReducer, action){
  switch(action.type){
    case "SET_FLAVOR_ARR":
      return {
        ...state,
        flavors: action.payload
      }
    case "SET_FLAVOR_DATA":
      return {
        ...state,
        flavor: action.payload
      }
    // case "SEARCH_FLAVORS":
    //   return {
    //     ...state,
    //     flavors: action.payload
    //   }
    case "ADD_FLAVOR_REVIEW":
      return {
        ...state,
        flavor_reviews: [...state.flavor_reviews, action.payload]
      }
      case "DELETE_FLAVOR_REVIEW":
        return {
          ...state,
          flavor_reviews: action.payload
        }
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

let initialStateOfModalReducer = {
  open: false,
  dimmer: ""
}

function modalReducer(state = initialStateOfModalReducer, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        open: true, 
        dimmer: action.dimmer
      }
    case 'CLOSE_MODAL':
      return { 
        ...state,
        open: false 
      }
    default:
      return state
  }
}

let allReducers = {
  flavorReducer,
  userInfo: userReducer,
  shops: shopReducer,
  modal: modalReducer,
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