import {NavLink, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

function Header(){
  const loggedInUser = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch()
  const history = useHistory()

  function handleHomeClick(){
    if(loggedInUser.username) {
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
    <div id="navContainer">
      <div>
        <h1 onClick={handleHomeClick}>Ice Cream Social</h1>
      </div>
      <nav>
        <NavLink className="headerLink" to="/flavors">Flavors</NavLink>
        {/* <NavLink className="headerLink" to="/shops">Shops</NavLink> */}
        {loggedInUser.username ? <NavLink className="headerLink" to="/users">Users</NavLink> : null}
        {loggedInUser.username ? <NavLink className="headerLink" to={`/profile/${loggedInUser.id}`}>{loggedInUser.username}</NavLink> : null}
        {loggedInUser.username ? <NavLink className="headerLink" onClick={handleLogout} to="/">Logout</NavLink> : <NavLink to="/">Login</NavLink>}
      </nav>
    </div>
  )
}

export default Header