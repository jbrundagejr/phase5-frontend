import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Feed, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function ConversationContainer(){
  const loggedInUser = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch()

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
      return conversationObj
    } else if (conversationObj.recipient.id === loggedInUser.id){
      return conversationObj
    }
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
          <Link to={`conversations/${convoObj.id}`}>
            <Feed.Summary>
              {loggedInUser.id === convoObj.sender.id ?
                <Feed.User>Convo with {convoObj.recipient.username}</Feed.User> : 
                <Feed.User>Convo with {convoObj.sender.username}</Feed.User>}
            </Feed.Summary>
          </Link>
        </Feed.Content>
      </Feed.Event>
    )
  })

  return (
    <div>
      <h2>Active Convos</h2>
      <Feed>
        {userConversations}
      </Feed>
    </div>
  )
}

export default ConversationContainer