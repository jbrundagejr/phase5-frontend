import {useState, useEffect} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Segment, Dimmer, Loader, Image, Item, Icon} from 'semantic-ui-react'
import DeleteAccountModal from './DeleteAccountModal'
import EditAccountModal from './EditAccountModal'
import { SERVER_URL } from '../../server_url'

function Profile(){
  const [isLoaded, setIsLoaded] = useState(false)
  const loggedInUser = useSelector(state => state.userReducer.user)
  const params = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect (() => {
    fetch(`${SERVER_URL}/users/${params.id}`)
      .then(res => res.json())
      .then(userData => {
        dispatch({type: "SET_PROFILE_USER", payload: userData})
        dispatch({type: "SET_FLAVOR_REVIEWS", payload: userData.flavor_reviews})
        setIsLoaded(true)
      })
  }, [dispatch, params.id])

  useEffect (() => {
    fetch(`${SERVER_URL}/conversations`)
      .then(res => res.json())
      .then(convoData => {
        dispatch({type: "SET_CONVO_ARR", payload: convoData})
        setIsLoaded(true)
      })
  }, [dispatch])

  const userInformation = useSelector(state => state.userReducer.profileUser)
  const userReviewArr = useSelector(state => state.flavorReducer.flavor_reviews)
  const conversations = useSelector(state => state.convoReducer.convos)

    if (!isLoaded) {
      return (
      <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' alt="Loading..." />
      </Segment>)
    } else {

      function handleReviewDelete(id){
        fetch(`${SERVER_URL}/flavor_reviews/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": localStorage.token,
          }
        })
        .then(res => res.json())
        .then((deletedReview) => {
             const newFlavorReviewArr = userReviewArr.filter(review => {
               return review.id !== deletedReview.id
             })
          dispatch({type: "DELETE_FLAVOR_REVIEW", payload: newFlavorReviewArr})
        })
      }

      const reviewArr = userReviewArr.map(reviewObj => {
        return (
          <Item key={reviewObj.id}>
            <Link to={`/flavors/${reviewObj.flavor.id}`}>
              <Item.Image size='small' src={reviewObj.flavor.image_url} alt={reviewObj.flavor.name}/>
            </Link>
            <Item.Content>
              <Item.Header id="profileReviewHeader" onClick={() => history.push(`/flavors/${reviewObj.flavor.id}`)}><h4>{reviewObj.flavor.name}</h4></Item.Header>
              <Item.Description>
                <p className="modalText">{reviewObj.content}</p>
                <p className="modalText">My Rating: {reviewObj.rating}</p>
              </Item.Description>
              <Item.Extra>
              {loggedInUser.id === userInformation.id ? 
                  <Icon onClick={() => handleReviewDelete(reviewObj.id)} name="trash alternate" />
                  : null}
              </Item.Extra>
            </Item.Content>
          </Item>
        )
      })

      
      const matchingConversation = conversations.filter(conversationObj => {
        if (loggedInUser.id === conversationObj.sender.id && userInformation.id === conversationObj.recipient.id){
          return true
        } else if (loggedInUser.id === conversationObj.recipient.id && userInformation.id === conversationObj.sender.id) {
          return true
        } else return null
      })

        function handleMessageButton(){
          if (matchingConversation.length > 0) {
            history.push(`/conversations/${matchingConversation[0].id}`)
          } else {
            const newConversation = {
              sender_id: loggedInUser.id,
              recipient_id: userInformation.id
            }
            fetch(`${SERVER_URL}/conversations`, {
              method: "POST",
              headers: {
                "Authorization": localStorage.token,
                "content-type": "application/json"
              },
              body: JSON.stringify(newConversation)
            })
            .then(res => res.json())
            .then(newConversation => {
              dispatch({type: "SET_CONVERSATION_DATA", payload: newConversation})
              history.push(`/conversations/${newConversation.id}`)
            })
          }
        }
    
      
      return(
        <div id="profileContainer">
          <h2>{userInformation.username}'s Profile</h2>
          <div id="profileInfo">
            <Image size="medium" src={userInformation.profile_img} alt={userInformation.username}></Image>
            <div id="userInfo">
              {loggedInUser.id === userInformation.id ? <p className="bodyText">Email: {userInformation.email}</p> : null}
              {loggedInUser.id === userInformation.id ? <p className="accountEditText" onClick={() => history.push(`/conversations`)}>My Convos</p> : null}
              {loggedInUser.id !== userInformation.id ? <p className="accountEditText" onClick={handleMessageButton}>Message {userInformation.username}</p> : null}
              {loggedInUser.id === userInformation.id ? <EditAccountModal /> : null}
              {loggedInUser.id === userInformation.id ? <DeleteAccountModal /> : null}
            </div>
          </div>
            <div id="profileReviewContainer">
              <h3>Flavors Reviewed:</h3>
              <Item.Group>
                {reviewArr}
              </Item.Group>
            </div>
        </div>
    )
  }
}

export default Profile