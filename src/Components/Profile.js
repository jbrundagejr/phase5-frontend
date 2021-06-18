import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Segment, Dimmer, Loader, Image, Comment, Icon} from 'semantic-ui-react'
import DeleteAccountModal from './DeleteAccountModal'
import EditAccountModal from './EditAccountModal'

function Profile(){
  const [isLoaded, setIsLoaded] = useState(false)
  const loggedInUser = useSelector(state => state.userReducer.user)
  const params = useParams()
  const dispatch = useDispatch()

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
  const userReviewArr= useSelector(state => state.flavorReducer.flavor_reviews)

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
      
      return(
        <div>
          <h2>{userInformation.username}'s Profile</h2>
          <div id="profileContainer">
            <img src={userInformation.profile_img} alt={userInformation.name}></img>
            {loggedInUser.id === userInformation.id ? <p>Email: {userInformation.email}</p> : null}
            <h3>Flavors Reviewed:</h3>
            {reviewArr}
          </div>
          {/* <div id="messageContainer">
            {loggedInUser.username === userInformation.username ? <p>Message Feature to be here</p> : null}
          </div> */}
          <div id="accountEditContainer">
            {loggedInUser.id === userInformation.id ? <EditAccountModal /> : null}
            {loggedInUser.id === userInformation.id ? <DeleteAccountModal /> : null}
          </div>
        </div>
    )
  }
}

export default Profile