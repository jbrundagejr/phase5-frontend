import {Modal, Button, Input, Form} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {useState} from 'react'

function EditAccountModal(){
  const userinfo = useSelector(state => state.userReducer.user)
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState(userinfo.username)
  const [userEmail, setUserEmail] = useState(userinfo.email)
  const [userProfilePic, setUserProfilePic] = useState("")
  const [errorMessage, setErrorMessage] =useState("")
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  function whatUserNamed(e){
    setUsername(e.target.value)
  }

  function whatUserEmailed(e){
    setUserEmail(e.target.value)
  }

  function whatUserProfiledPic(e){
    setUserProfilePic(e.target.value)
  }

  function handleUpdate(e){
    e.preventDefault()
    const updatedUser = {
      username: username,
      email: userEmail,
      profile_img: userProfilePic
    }
    fetch(`http://localhost:3000/users/${params.id}`, {
      method: "PATCH",
      headers: {
        "Authorization": localStorage.token,
        "Content-type":"application/json"
      },
      body: JSON.stringify(updatedUser)
    })
    .then(res => res.json())
    .then(resp =>{
      if (resp.error){
        setUserEmail("")
        setUserProfilePic("")
        setUsername("")
        setErrorMessage(resp.error)
      } else {
        dispatch({type: "UPDATE_USER_INFO", payload: resp})
        dispatch({type: "SET_PROFILE_USER", payload: resp})
        history.push(`/profile/${params.id}`)
        setOpen(false)
      }
    })
  }
  return(
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="ui small button">Edit Account</Button>}
        className="modal"
      >
      <Modal.Header>Edit Account</Modal.Header>
      {errorMessage ? <p>Hmm that didn't work. Please try again.</p> : null}
        <Form onSubmit={handleUpdate}>
          <Input placeholder="Name" required value={username} onChange={whatUserNamed}/>
          <Input placeholder="Email" required type = "email"  value={userEmail} onChange={whatUserEmailed}/>
          <Input placeholder="Profile Picture" required type="url" value={userProfilePic} onChange={whatUserProfiledPic}/>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default EditAccountModal