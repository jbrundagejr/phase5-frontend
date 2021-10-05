import {Modal, Button, Icon} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'

function DeleteAccountModal(){
  const userinfo = useSelector(state => state.userReducer.user)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  function handleDelete(id){
    fetch(`https://ancient-meadow-93230.herokuapp.com/users/${id}`, {
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
        trigger={<p className="accountEditText">Delete Account</p>}
      >
        <Modal.Header>
        <div id="modalHeader">
          <h3>Delete Account</h3> 
          <Icon id="modalBackButton" size="large" name='arrow alternate circle left' onClick={() => setOpen(false)}/>
        </div>
        </Modal.Header>
        <Modal.Content>
          <p className="bodyText">Are you sure you want to delete your account? We'd hate to see you go!</p>
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