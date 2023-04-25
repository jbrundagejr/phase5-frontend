import {Form, TextArea, Button} from 'semantic-ui-react'
import {useSelector} from 'react-redux'
import {useState} from 'react'
import { SERVER_URL } from '../server_url'

function MessageForm(){
  const conversation = useSelector(state => state.convoReducer.convo)
  const [userContent, setUserContent] = useState("")

  function handleMessageSubmit(e){
    e.preventDefault()
    const newMessage = {
      conversation_id: conversation.id,
      content: userContent
    }
    fetch(`${SERVER_URL}/messages`, {
      method: "POST",
      headers: {
        "Authorization": localStorage.token,
        "content-type": "application/json"
      },
      body: JSON.stringify(newMessage)
    })
    .then(res => res.json())
    .then(newMessage => {
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