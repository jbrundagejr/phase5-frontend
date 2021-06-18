import {useState, useEffect} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Segment, Dimmer, Loader, Image, Comment, Icon, Button} from 'semantic-ui-react'
import DeleteAccountModal from './DeleteAccountModal'
import EditAccountModal from './EditAccountModal'

function Profile(){
  const [isLoaded, setIsLoaded] = useState(false)
  const loggedInUser = useSelector(state => state.userReducer.user)
  const params = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect (() => {
    fetch(`http://localhost:3000/users/${params.id}`)
      .then(res => res.json())
      .then(userData => {
        dispatch({type: "SET_PROFILE_USER", payload: userData})
        dispatch({type: "SET_FLAVOR_REVIEWS", payload: userData.flavor_reviews})
        setIsLoaded(true)
      })
  }, [dispatch, params.id])

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
        fetch(`http://localhost:3000/flavor_reviews/${id}`, {
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
          <Comment key={reviewObj.id}>
          <Image src={reviewObj.flavor.image_url} alt={reviewObj.flavor.name} size="small"></Image>
          <Comment.Content>
          <Comment.Author>{reviewObj.flavor.name}</Comment.Author>
            <Comment.Text>
              {reviewObj.content}
              My Rating: {reviewObj.rating}
            </Comment.Text>
            <Comment.Actions>
              {loggedInUser.id === userInformation.id ? 
                <Comment.Action>
                  <Icon onClick={() => handleReviewDelete(reviewObj.id)} name="trash alternate" />
                </Comment.Action> : null}
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        )
      })

      
      const matchingConversation = conversations.filter(conversationObj => {
        if (loggedInUser.id === conversationObj.sender.id && userInformation.id === conversationObj.recipient.id ||
              loggedInUser.id === conversationObj.recipient.id && userInformation.id === conversationObj.sender.id) {
                return conversationObj
              } else return (null)
      })

      console.log(matchingConversation)

        function handleMessageButton(){
          if (matchingConversation) {
            history.push(`/conversations/${matchingConversation.id}`)
          } else {
            const newConversation = {
              sender_id: loggedInUser.id,
              recipient_id: userInformation.id
            }
            fetch("http://localhost:3000/conversations", {
              method: "POST",
              headers: {
                "Authorization": localStorage.token,
                "content-type": "application/json"
              },
              body: JSON.stringify(newConversation)
            })
            .then(res => res.json())
            .then(newConversation => {
              history.push(`/conversations/${newConversation.id}`)
            })
          }
        }
    
      
      return(
        <div>
          <h2>{userInformation.username}'s Profile</h2>
          <div id="profileContainer">
            <img src={userInformation.profile_img} alt={userInformation.username}></img>
            {loggedInUser.id === userInformation.id ? <p>Email: {userInformation.email}</p> : null}
            {loggedInUser.id === userInformation.id ? <Link to={`/conversations`}>My Convos</Link> : null}
            {loggedInUser.id !== userInformation.id ? <Button onClick={handleMessageButton}>Message {userInformation.username}</Button> : null}
            <h3>Flavors Reviewed:</h3>
            {reviewArr}
          </div>
          
          <div id="accountEditContainer">
            {loggedInUser.id === userInformation.id ? <EditAccountModal /> : null}
            {loggedInUser.id === userInformation.id ? <DeleteAccountModal /> : null}
          </div>
        </div>
    )
  }
}

export default Profile