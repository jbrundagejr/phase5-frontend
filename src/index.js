import React from 'react'
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import {createStore, combineReducers} from 'redux'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

let initialStateOfUserReducer = {
  user: {},
  token: "",
  profileUser: {},
  users: [],
  sent_conversations: [],
  received_conversations: []
}

function userReducer(state = initialStateOfUserReducer, action){
  switch(action.type){
    case "SET_USER_INFO":
      return{
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }
    case "SET_USER_ARR":
      return{
        ...state,
        users: action.payload
      } 
    case "SET_PROFILE_USER":
      return {
        ...state,
        profileUser: action.payload
      }
    case "UPDATE_USER_INFO":
      return{
        ...state,
        user: action.payload.user
      }
    case "LOG_OUT":
      return{
        ...state,
        user: {},
        otherUser: {},
        token: "",
        users: []
      }
    default:
      return state
  }
}

let initialStateOfFlavorReducer = {
  flavors: [],
  flavor_reviews: [],
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
    case "SET_FLAVOR_REVIEWS":
      return {
        ...state,
        flavor_reviews: action.payload
      }
    case "SEARCH_FLAVORS":
      return {
        ...state,
        flavors: action.payload
      }
    case "ADD_FLAVOR_REVIEW":
      return {
        ...state,
        flavor_reviews: action.payload
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
  shop: {},
  shop_reviews: []
}

function shopReducer(state = initialStateOfShopReducer, action){
  switch(action.type){
    case "SET_SHOP_ARR":
      return {
        ...state,
        shops: action.payload
      }
    case "SET_SHOP_REVIEWS":
      return {
        ...state,
        shop_reviews: action.payload
      }
    case "SET_SHOP_DATA":
      return {
        ...state,
        shop: action.payload
      }
    case "ADD_SHOP_REVIEW":
      return {
        ...state,
        shop_reviews: action.payload
      }
    case "DELETE_SHOP_REVIEW":
      return {
        ...state,
        shop_reviews: action.payload
      }
      default:
        return state
  }
}

let initialStateOfModalReducer = {
  open: true,
  dimmer: "blurring"
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
  userReducer,
  shopReducer,
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