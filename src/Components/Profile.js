import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Segment, Dimmer, Loader, Image, Comment, Icon} from 'semantic-ui-react'
import DeleteAccountModal from './DelectAccountModal'
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
        setIsLoaded(true)
      })
  }, [params.id])

  const userInformation = useSelector(state => state.userReducer.profileUser)

    if (!isLoaded) {
      return (
      <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' alt="Loading..." />
      </Segment>)
    } else {

      const reviewArr = userInformation.flavor_reviews.map(reviewObj => {
        return (
          <Comment key={reviewObj.id}>
          <Image src={reviewObj.flavor.image_url} alt={reviewObj.flavor.name} size="small"></Image>
          <Comment.Content>
          <Comment.Author>{reviewObj.flavor.name} from </Comment.Author>
            <Comment.Text>
              {reviewObj.content}
              My Rating: {reviewObj.rating}
              {loggedInUser.username === userInformation.username ? 
                <Icon name="trash alternate" ></Icon> : null}
            </Comment.Text>
          </Comment.Content>
        </Comment>
        )
      })
      
      return(
        <div>
          <h2>{userInformation.username}'s Profile</h2>
          <div id="profileContainer">
            <img src={userInformation.profile_img} alt={userInformation.name}></img>
            {loggedInUser.username === userInformation.username ? <p>Email: {userInformation.email}</p> : null}
            <h3>Flavors Reviewed:</h3>
            {reviewArr}
          </div>
          {/* <div id="messageContainer">
            {loggedInUser.username === userInformation.username ? <p>Message Feature to be here</p> : null}
          </div> */}
          <div id="accountEditContainer">
            {loggedInUser.username === userInformation.username ? <EditAccountModal /> : null}
            {loggedInUser.username === userInformation.username ? <DeleteAccountModal /> : null}
          </div>
        </div>
    )
  }
}

export default Profile