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
        history.push('/flavors')
      }
    })
  }

  return(
    <div id="loginContainer">
      <p className="bodyText">Welcome to Ice Cream Social! </p>
      <p className="bodyText">This is a place for you to discover the best flavors in your community, as well as meet other ice cream lovers.</p>
      <p className="bodyText">Login to get started.</p>
      {errorMessage ? <p className="bodyText">Sorry, that's the wrong username or password. Please try again.</p> : null}
      <Form className="form" onSubmit={handleClick}>
        <label htmlFor="email" className="label">Email Address</label>
        <Input id="username" value={email} onChange={userEmail} type="text" placeholder="Your email address"></Input><br/>
        <label htmlFor="password" className="label">Password</label>
        <Input id="userpassword" value={password} onChange={userPassword} type="password" placeholder="Your password"></Input><br/>
        <Button>Login</Button><br/>
      </Form>
      <p className="bodyText">Don't have an account?</p><CreateProfile />
    </div>
  )
}

export default Login