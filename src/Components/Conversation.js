import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState, useRef} from 'react'
import {useParams, Link} from 'react-router-dom'
import {Comment, Header, Icon, Segment, Dimmer, Loader, Image} from 'semantic-ui-react'
import MessageForm from './MessageForm'
import {createConsumer} from '@rails/actioncable'
import { SERVER_URL } from '../server_url'

function Conversation(){
  const loggedInUser = useSelector(state => state.userReducer.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()
  const cable = useRef()

  useEffect(() => {
    fetch(`${SERVER_URL}/conversations/${params.id}`)
    .then(res => res.json())
    .then(convoData => {
      dispatch({type: "SET_CONVERSATION_DATA", payload: convoData})
      dispatch({type: "SET_MESSAGES", payload: convoData.messages})
      setIsLoaded(true)
    })
  }, [dispatch, params.id])

  const messages = useSelector(state => state.convoReducer.messages)

  useEffect(() => {
    if(!cable.current){
      cable.current = createConsumer("ws://phase5-backend-development.onrender.com/cable")
    }
    const paramsToSend = {
      channel: "ConversationChannel",
      id: params.id
    }
    const handlers = {
      received(data) {
        const newMessageArr = [...messages, data]
        dispatch({type: "ADD_MESSAGE", payload: newMessageArr})
      },
      connect(){
        console.log("connected")
      },
      disconnected(){
        console.log("disconnected")
        cable.current = null
      }
    }
    const subscription = cable.current.subscriptions.create(paramsToSend, handlers)
    return function cleanup(){
      cable.current = null
      subscription.unsubscribe()
    }
  }, [params.id, messages, dispatch])
  

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
      fetch(`${SERVER_URL}/messages/${id}`, {
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
      if (loggedInUser.id === messageObj.user.id){
      return (
        <Comment id="senderMessage" key={messageObj.id}>
          {/* <Comment.Avatar src={messageObj.user.profile_img} alt={messageObj.user.username} /> */}
          <Comment.Content>
            <Comment.Author>{messageObj.user.username}</Comment.Author>
            <Comment.Text>
              <p className="bodyText">{messageObj.content}</p>
              {loggedInUser.id === messageObj.user.id ? 
                <Icon name='trash alternate' onClick={() => handleMessageDelete(messageObj.id)}/>
                : null}
            </Comment.Text>
          </Comment.Content>
        </Comment>
      )
        } else {
          return (
            <Comment id="receiverMessage" key={messageObj.id}>
            <Comment.Avatar src={messageObj.user.profile_img} alt={messageObj.user.username} />
            <Comment.Content>
              <Comment.Author>
                <Link to={`/profile/${messageObj.user.id}`}>{messageObj.user.username}</Link>
              </Comment.Author>
              <Comment.Text>
                <p className="bodyText">{messageObj.content}</p>
                {loggedInUser.id === messageObj.user.id ? 
                  <Icon name='trash alternate' onClick={() => handleMessageDelete(messageObj.id)}/>
                  : null}
              </Comment.Text>
            </Comment.Content>
          </Comment>
          )
        }
    })

    return (
      <div className="specificConversationContainer">
          <Header>
            <h2>Messages</h2>
          </Header>
          <div className="specificConversationContainer">
            <Comment.Group size="large">
              {messageArray}
            </Comment.Group>
          </div>
        <MessageForm />
      </div>
    )
  }
}

export default Conversation