import {NavLink, useHistory} from 'react-router-dom'

function Header(){
  return(
    <div>
      <h1>Ice Cream Social</h1>
      <nav>
        <NavLink to="/shops">Shops</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/profile/1">Profile</NavLink>
        <NavLink to="/">Login</NavLink>
      </nav>
    </div>
  )
}

export default Header