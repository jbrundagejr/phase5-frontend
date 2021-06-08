import {NavLink, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

function Header(){
  const isLoggedIn = useSelector(state => state.userInfo)
  const dispatch = useDispatch()
  const history = useHistory()

  function handleHomeClick(){
    if(isLoggedIn.username) {
      history.push('/shops')
    } else {
      history.push("/")
    }
  }
  
  function handleLogout(){
    localStorage.clear()
    dispatch({type: "LOG_OUT"})
  }

  return(
    <div>
      <h1 onClick={handleHomeClick}>Ice Cream Social</h1>
      <nav>
        <NavLink to="/shops">Shops</NavLink>
        {isLoggedIn.username ? <NavLink to="/users">Users</NavLink> : null}
        {isLoggedIn.username ? <NavLink to="/profile/:id">{isLoggedIn.username}</NavLink> : null}
        {isLoggedIn.username ? <NavLink onClick={handleLogout} to="/">Logout</NavLink> : <NavLink to="/">Login</NavLink>}
      </nav>
    </div>
  )
}

export default Header