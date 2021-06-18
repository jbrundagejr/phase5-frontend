import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Comment, Header, Icon, Segment, Dimmer, Loader, Image} from 'semantic-ui-react'
import MessageForm from './MessageForm'

function Conversation(){
  const loggedInUser = useSelector(state => state.userReducer.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:3000/conversations/${params.id}`)
    .then(res => res.json())
    .then(convoData => {
      dispatch({type: "SET_CONVERSATION_DATA", payload: convoData})
      dispatch({type: "SET_MESSAGES", payload: convoData.messages})
      setIsLoaded(true)
    })
  }, [dispatch, params.id])

  const messages = useSelector(state => state.convoReducer.messages)

  if (!isLoaded) {
    return (
      <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' alt="Loading..." />
      </Segment>)
  } else {

    function handleMessageDelete(id){
      fetch(`http://localhost:3000/messages/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(res => res.json())
      .then((deletedMessage) => {
        const newMessageArr = messages.filter(message => {
          return message.id !== deletedMessage.id
        })
        dispatch({type: "DELETE_MESSAGE", payload: newMessageArr})
      })
    }

    const messageArray = messages.map(messageObj => {
      console.log(messageObj)
      return (
          <Comment key={messageObj.id}>
            <Comment.Avatar src={messageObj.user.profile_img} alt={messageObj.user.username} />
            <Comment.Content>
              <Comment.Author>{messageObj.user.username}</Comment.Author>
              <Comment.Text>{messageObj.content}</Comment.Text>
            </Comment.Content>
            <Comment.Actions>
              {loggedInUser.id === messageObj.user.id ? 
                <Comment.Action>
                  <Icon name='trash alternate' onClick={() => handleMessageDelete(messageObj.id)}/>
                </Comment.Action> : null}
            </Comment.Actions>
          </Comment>
      )
    })
    return (
      <div>
        <Comment.Group>
          <Header as='h2' dividing>
            Messages
          </Header>
          {messageArray}
        </Comment.Group>
        <MessageForm />
      </div>
    )
  }
}

export default Conversation