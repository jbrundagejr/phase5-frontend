import {useState} from 'react'
import {Input, Button} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

function Login(){
  const [userInfo, setUserInfo] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory()

  function userEmail(e){
    setEmail(e.target.value)
  }

  function userPassword(e){
    setPassword(e.target.value)
  }

  function handleClick(e){
    e.preventDefault()
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(resp =>{
      if (resp.error){
        setErrorMessage(resp.error)
      } else {
        setUserInfo(resp)
        localStorage.token = resp.token
        history.push('/shops')
      }
    })
  }

  return(
    <div id="photoContainer">
    <div id="loginFormContainer">
      <p className="welcomeBodyFont">Welcome to Ice Cream Social!</p>
      <p className="welcomeBodyFont">Login to get started.</p>
      {errorMessage ? <p>Incorrect email or password.</p> : null}
      <form onSubmit={handleClick}>
        <Input className="input" label='Email' id="name" value={email} onChange={userEmail} type="text" placeholder="Your email address"></Input><br/>
        <Input className="input" label='Password' id="userpassword" value={password} onChange={userPassword} type="password" placeholder="Your password"></Input><br/>
        <Button>Login</Button><br/>
      </form>
    </div>
  </div>
  )
}

function setUserInfo(userInfo){
  return {
    type: "SET_USER_INFO",
    payload: userInfo
  }
}

let mapDispatch = {
  setUserInfo
}

export default connect(null, mapDispatch)(Login)