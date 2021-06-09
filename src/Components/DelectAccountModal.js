import {Modal, Button} from 'semantic-ui-react'
import {useDispatch} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {useState} from 'react'

function DeleteAccountModal(){
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  function handleDelete(){
    fetch(`http://localhost:3000/users/${params.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.token
      }
    })
    .then(res => res.json())
    .then(() => {
      dispatch({type: "LOG_OUT"})
      history.push('/')
    })
  }

  return (
    <div>
      <Modal onClose={() => setOpen(false)}
             onOpen={() => setOpen(true)}
             open={open} 
             trigger={<Button className="ui small button">Delete Account</Button>}
      >
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            No
          </Button>
          <Button positive onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default DeleteAccountModal