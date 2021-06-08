import {NavLink, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

function Header(){
  const userinfo = useSelector(state => state.userInfo)
  const dispatch = useDispatch()
  const history = useHistory()

  function handleHomeClick(){
    if(userinfo.username) {
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
        {userinfo.username ? <NavLink to="/users">Users</NavLink> : null}
        {userinfo.username ? <NavLink to={`/profile/${userinfo.id}`}>{userinfo.username}</NavLink> : null}
        {userinfo.username ? <NavLink onClick={handleLogout} to="/">Logout</NavLink> : <NavLink to="/">Login</NavLink>}
      </nav>
    </div>
  )
}

export default Header