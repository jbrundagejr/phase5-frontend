import {Modal, Icon, Image, Header, Segment, Dimmer, Loader, Comment} from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import FlavorReviewForm from './FlavorReviewForm'
import ShopMap from './ShopMap'
import { SERVER_URL } from '../../server_url'

function FlavorModal(){
  const loggedInUser = useSelector(state => state.userReducer.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const dimmer = useSelector(state => state.modal.dimmer)
  const open = useSelector(state => state.modal.open)
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch(`${SERVER_URL}/flavors/${params.id}`)
      .then(res => res.json())
      .then(flavorData => {
        dispatch({type: "SET_FLAVOR_DATA", payload: flavorData})
        dispatch({type: "SET_FLAVOR_REVIEWS", payload: flavorData.flavor_reviews})
        setIsLoaded(true)
      })
  }, [dispatch, params.id])

  const flavorInfo = useSelector(state => state.flavorReducer.flavor)
  const flavorReviewInfo = useSelector(state => state.flavorReducer.flavor_reviews)

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
      const newFlavorReviewArr = flavorReviewInfo.filter(review => {
        return review.id !== deletedReview.id
      })
      dispatch({type: "DELETE_FLAVOR_REVIEW", payload: newFlavorReviewArr})
    })
  } 

    
  const flavorReviewArr = flavorReviewInfo.map(flavorReviewObj => {
    return (
      <Comment key={flavorReviewObj.id}>
        <Comment.Avatar src={flavorReviewObj.user.profile_img} alt={flavorReviewObj.user.username} />
        <Comment.Content>
            <Comment.Author>
              {loggedInUser.id ? <Link to={`/profile/${flavorReviewObj.user.id}`}>{flavorReviewObj.user.username}</Link> :
                <p className="modalText">{flavorReviewObj.user.username}</p>}
            </Comment.Author>
          <Comment.Text>
          <p className="modalText">{flavorReviewObj.content}</p>
          </Comment.Text>
          <Comment.Text>
            <p className="modalText">Rating: {flavorReviewObj.rating}</p>
          </Comment.Text>
          <Comment.Actions>
            {loggedInUser.id === flavorReviewObj.user.id ? 
              <Comment.Action>
                <Icon name='trash alternate' onClick={() => handleReviewDelete(flavorReviewObj.id)}/>
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
          src={flavorInfo.image_url} 
          alt={flavorInfo.name}
          onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
        />  
        <Modal
          dimmer={dimmer}
          open={open}
          key={flavorInfo.id}
          >
          <Modal.Header>
            <div id="modalHeader">
              <h3>{flavorInfo.name}</h3> 
              <Icon id="modalBackButton" size="large" name='arrow alternate circle left' onClick={() => history.push('/flavors')}/>
            </div>
          </Modal.Header>
          <Modal.Content image>
            <Image size='medium' src={flavorInfo.image_url} 
              alt={flavorInfo.name} wrapped />
              <Modal.Description>
                <div id="modalContent">
                  <div id="flavorDetailsDiv">
                    <div id="shopImageAndMapContainer">
                      <Image size="medium" src={flavorInfo.shop.image_url} alt={flavorInfo.shop.name}></Image>
                      <ShopMap />
                    </div>
                    <a className="modalLink" href={flavorInfo.shop.website} target="_blank" rel="noreferrer">{flavorInfo.shop.name}</a>
                    <Header>What this flavor is about...</Header>
                    <p className="modalText">{flavorInfo.description}</p>
                    <p className="modalText">Average Rating: {flavorInfo.average_rating}</p>
                  </div>
                </div>
              <Comment.Group id="commentGroup">
              {flavorReviewArr.length > 0 ? <h3>Reviews:</h3> : <Header>We need someone to review this bad boy!</Header>}
                {flavorReviewArr}
              </Comment.Group>
              </Modal.Description>
          </Modal.Content>
          {loggedInUser.username ? 
            <Modal.Actions>
              <FlavorReviewForm />
            </Modal.Actions> : null }
        </Modal>
      </div>
    )
  }
}


export default FlavorModal