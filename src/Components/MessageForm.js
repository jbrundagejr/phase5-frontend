import {Form, TextArea, Button} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'

function MessageForm(){
  const conversation = useSelector(state => state.convoReducer.convo)
  const messages = useSelector(state => state.convoReducer.messages)
  const [userContent, setUserContent] = useState("")
  const dispatch = useDispatch()

  function handleMessageSubmit(e){
    e.preventDefault()
    const newMessage = {
      conversation_id: conversation.id,
      content: userContent
    }
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Authorization": localStorage.token,
        "content-type": "application/json"
      },
      body: JSON.stringify(newMessage)
    })
    .then(res => res.json())
    .then(newMessage => {
      const newMessageArr = [...messages, newMessage]
      dispatch({type: "ADD_MESSAGE", payload: newMessageArr})
      setUserContent("")
    })
  }

  return (
    <Form onSubmit={handleMessageSubmit} reply>
      <TextArea value={userContent} placeholder="Message" onChange={e => setUserContent(e.target.value)}/>
      <Button color='purple' content='Message' labelPosition='left' icon='share square outline' primary />
    </Form>
  )
}

export default MessageForm