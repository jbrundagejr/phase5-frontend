import {Modal, Icon, Image, Segment, Dimmer, Loader, Comment} from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import ReviewForm from './ReviewForm'
import {useParams, useHistory, Link} from 'react-router-dom'

function ShopModal(){
  const loggedInUser = useSelector(state => state.userReducer.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const dimmer = useSelector(state => state.modal.dimmer)
  const open = useSelector(state => state.modal.open)
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(`http://localhost:3000/shops/${params.id}`)
      .then(res => res.json())
      .then(shopData => {
        dispatch({type: "SET_SHOP_DATA", payload: shopData})
        dispatch({type: "SET_SHOP_REVIEWS", payload: shopData.reviews})
        setIsLoaded(true)
      })
  }, [dispatch, params.id])

  const shopInfo = useSelector(state => state.shopReducer.shop)
  const reviewInfo = useSelector(state => state.shopReducer.shop_reviews)

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
      fetch(`http://localhost:3000/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": localStorage.token,
        }
      })
      .then(res => res.json())
      .then((deletedReview) => {
        const newReviewArr = reviewInfo.filter(review => {
          return review.id !== deletedReview.id
        })
        dispatch({type: "DELETE_SHOP_REVIEW", payload: newReviewArr})
      })
    }

    const reviewArr = reviewInfo.map(reviewObj => {
      console.log(reviewObj)
      return (
        <Comment key={reviewObj.id}>
          <Comment.Avatar src={reviewObj.user.profile_img} alt={reviewObj.user.username} />
          <Comment.Content>
            <Link to={`/profile/${reviewObj.user.id}`}>
              <Comment.Author>
                {reviewObj.user.username}
              </Comment.Author>
            </Link>
            <Comment.Text>
              {reviewObj.content}
            </Comment.Text>
            <Comment.Text>
              Rating: {reviewObj.rating}
            </Comment.Text>
            <Comment.Actions>
              {/* {loggedInUser.username && loggedInUser.username !== reviewObj.user.username ? 
                <Comment.Action>
                  Message {reviewObj.user.username}
                </Comment.Action> : null } */}
              {loggedInUser.id === reviewObj.user.id ? 
                <Comment.Action>
                  <Icon name='trash alternate' onClick={() => handleReviewDelete(reviewObj.id)}/>
                </Comment.Action> : null}
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      )
    })

    return (
      <div>
      <Image 
        size='huge' centered rounded 
        src={shopInfo.image_url} 
        alt={shopInfo.name}
        onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
      />  
      <Modal
        dimmer={dimmer}
        open={open}
        key={shopInfo.id}
        >
        <Modal.Header>
          <div id="modalHeader">
            <h3>{shopInfo.name}</h3> 
            <Icon name='arrow alternate circle left' onClick={() => history.push('/shops')}/>
          </div>
        </Modal.Header>
        <Modal.Content image>
          <Image size='medium' src={shopInfo.image_url} 
            alt={shopInfo.name} wrapped />
          <Modal.Description>
            <a href={shopInfo.website} target="_blank" rel="noreferrer">Website</a>
            <p>Average Rating: {shopInfo.average_rating}</p>
            {reviewArr.length > 0 ? <h3>Reviews:</h3> : <h3>Anyone been to this shop? Please review if so!</h3>}
            <Comment.Group>
              {reviewArr}
            </Comment.Group>
          </Modal.Description>
        </Modal.Content>
        {loggedInUser.username ? 
          <Modal.Actions>
            <ReviewForm />
          </Modal.Actions> : null }
      </Modal>
    </div>
    )
  }
}

export default ShopModal