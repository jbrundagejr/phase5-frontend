import {useState} from 'react'
import {Form, Input, Button} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import CreateProfile from './CreateProfile'
 
function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory()
  const dispatch = useDispatch()

  function userEmail(e){
    setEmail(e.target.value)
  }

  function userPassword(e){
    setPassword(e.target.value)
  }

  function handleClick(e){
    e.preventDefault()
    fetch("http://localhost:3000/login", {
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
        dispatch({type: "SET_USER_INFO", payload: resp})
        localStorage.token = resp.token
        history.push('/shops')
      }
    })
  }

  return(
    <div id="loginFormContainer">
      <p className="welcomeBodyFont">Welcome to Ice Cream Social!</p>
      <p className="welcomeBodyFont">Login to get started.</p>
      {errorMessage ? <p>Incorrect email or password.</p> : null}
      <Form onSubmit={handleClick}>
        <Input className="input" label='Email' id="name" value={email} onChange={userEmail} type="text" placeholder="Your email address"></Input><br/>
        <Input className="input" label='Password' id="userpassword" value={password} onChange={userPassword} type="password" placeholder="Your password"></Input><br/>
        <Button>Login</Button><br/>
      </Form>
      <p>Don't have an account? </p><CreateProfile />
    </div>
  )
}

export default Login