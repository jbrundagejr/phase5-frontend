import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Feed, Image} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'

function ConversationContainer(){
  const loggedInUser = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    fetch("http://localhost:3000/conversations")
      .then(res => res.json())
      .then(convoData => {
        dispatch({type: "SET_CONVO_ARR", payload: convoData})
      })
  }, [dispatch])

  const convoArr = useSelector(state => state.convoReducer.convos)

  const filteredConversations = convoArr.filter(conversationObj => {
    if (conversationObj.sender.id === loggedInUser.id){
      return true
    } else if (conversationObj.recipient.id === loggedInUser.id){
      return true
    } else return null
  })

  const userConversations = filteredConversations.map(convoObj => {
    return (
      <Feed.Event key={convoObj.id}>
        <Feed.Label>
          {loggedInUser.id === convoObj.sender.id ? 
            <Image src={convoObj.recipient.profile_img} alt={convoObj.recipient.username}/> :
            <Image src={convoObj.sender.profile_img}/>}
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            {loggedInUser.id === convoObj.sender.id ?
            <Feed.User onClick={() => history.push(`conversations/${convoObj.id}`)}>Convo with {convoObj.recipient.username}</Feed.User> : 
            <Feed.User onclick={() => history.push(`conversations/${convoObj.id}`)}>Convo with {convoObj.sender.username}</Feed.User>}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    )
  })

  return (
    <div id="conversationContainer">
      <h2>Active Convos</h2>
      <Feed>
        {userConversations.length > 0 ? userConversations : 
        <p className="bodyText">You don't have any active conversations with other users. Get chatting!</p>}
      </Feed>
    </div>
  )
}

export default ConversationContainer