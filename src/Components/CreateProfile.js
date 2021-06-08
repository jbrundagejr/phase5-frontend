import {useState} from 'react'
import {Modal, Form, Input, Button} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

function CreateProfile(){
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userProfilePic, setUserProfilePic] = useState("")
  const [errorMessage, setErrorMessage] =useState("")
  const history = useHistory()
  const dispatch = useDispatch()
  
  function whatUserNamed(e){
    setUsername(e.target.value)
  }

  function whatUserEmailed(e){
    setUserEmail(e.target.value)
  }

  function whatUserPassworded(e){
    setUserPassword(e.target.value)
  }

  function whatUserProfiledPic(e){
    setUserProfilePic(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    const newUser = {
      username: username,
      email: userEmail,
      password: userPassword,
      profile_img: userProfilePic
    }
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify(newUser)
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
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<p id="create-account">Create one!</p>}
    className="modal"
    >
      <Modal.Header>Create Account</Modal.Header>
      {errorMessage ? <p>Invalid input info. Please try again.</p> : null}
        <Form onSubmit={e => handleSubmit(e)}>
            <Input placeholder="Name" required value={username} onChange={whatUserNamed}/>
            <Input placeholder="Password" required type="password"  value={userPassword} onChange={whatUserPassworded}/>
            <Input placeholder="Email" required type = "email"  value={userEmail} onChange={whatUserEmailed}/>
            <Input placeholder="Profile Picture" required type="url" value={userProfilePic} onChange={whatUserProfiledPic}/>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal>
  )
}

export default CreateProfile