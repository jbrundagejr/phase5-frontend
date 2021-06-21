import {Modal, Button, Input, Form, Icon} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useState} from 'react'

function EditAccountModal(){
  const userinfo = useSelector(state => state.userReducer.user)
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userProfilePic, setUserProfilePic] = useState("")
  const [errorMessage, setErrorMessage] =useState("")
  const dispatch = useDispatch()
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
        setOpen(false)
        dispatch({type: "UPDATE_USER_INFO", payload: resp})
        dispatch({type: "SET_PROFILE_USER", payload: resp.user})
      }
    })
  }
  return(
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<p className="accountEditText">Edit Account</p>}
        className="modal"
      >
      <Modal.Header>
        <div id="modalHeader">
          <h3>Edit Account</h3> 
          <Icon id="modalBackButton" size="large" name='arrow alternate circle left' onClick={() => setOpen(false)}/>
        </div>
      </Modal.Header>
      {errorMessage ? <p>Hmm that didn't work. Please try again.</p> : null}
        <Form className="form" onSubmit={handleUpdate}>
          <label htmlFor="username" className="label">New Username</label>
          <Input id="username" placeholder={userinfo.username} required value={username} onChange={whatUserNamed}/>
          <label htmlFor="email" className="label">New Email Address</label>
          <Input id="email" placeholder={userinfo.email} required type = "email"  value={userEmail} onChange={whatUserEmailed}/>
          <label htmlFor="profile_img" className="label">New Profile Picture</label>
          <Input id="profile_img" placeholder={userinfo.profile_img} required type="url" value={userProfilePic} onChange={whatUserProfiledPic}/>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default EditAccountModal