import {Modal, Button} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'

function DeleteAccountModal(){
  const userinfo = useSelector(state => state.userReducer.user)
  const usersArr = useSelector(state => state.userReducer.users)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  function handleDelete(id){
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.token
      }
    })
    .then(() => {
      setOpen(false)
      history.push('/')
      localStorage.clear()
      dispatch({type: "LOG_OUT"})
    })
  }

  return (
    <div>
      <Modal 
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open} 
        trigger={<Button className="ui small button">Delete Account</Button>}
      >
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account? We'd hate to see you go!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            No
          </Button>
          <Button positive onClick={() => handleDelete(userinfo.id)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default DeleteAccountModal