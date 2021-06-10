import {Modal, Icon, Image, Header, Segment, Dimmer, Loader, Comment} from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import ReviewForm from './ReviewForm'

function FlavorModal(props){
  const loggedInUser = useSelector(state => state.userInfo)
  const [isLoaded, setIsLoaded] = useState(false)
  const dimmer = useSelector(state => state.modal.dimmer)
  const open = useSelector(state => state.modal.open)
  const dispatch = useDispatch()
  const flavorID = useSelector((state) => state.flavorReducer.flavors[props.id])
  
  // export const TodoListItem = (props) => {
  //   const todo = useSelector((state) => state.todos[props.id])
  //   return <div>{todo.text}</div>
  // }
  
  console.log(flavorID)
  
  useEffect(() => {
    fetch(`http://localhost:3000/flavors/${flavorID}`)
      .then(res => res.json())
      .then(flavorData => {
        dispatch({type: "SET_FLAVOR_DATA", payload: flavorData})
        setIsLoaded(true)
      })
  }, [flavorID, dispatch])

  const flavorInfo = useSelector(state => state.flavorReducer.flavor)

  if (!isLoaded) {
    return (
    <Segment>
      <Dimmer active>
        <Loader />
      </Dimmer>
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' alt="Loading..." />
    </Segment>)
  } else {

  // function handleReviewDelete(flavorInfo.flavor_reviews.id){
  //   fetch(`https://localhost:3000/flavor_reviews/${flavorInfo.flavor_reviews.id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Authorization": localStorage.token,
  //     }
  //   })
  //   .then(res => res.json())
  //   .then((deletedReview) => {
  //        const newFlavorReviewArr = {flavorInfo.flavor_reviews}.filter(review => {
  //          return review.id !== deletedReview.id
  //        })
  //     dispatch({type: "DELETE_FLAVOR_REVIEW", payload: newFlavorReviewArr})
  //   })
  // }

    // const flavorReviewArr = flavorInfo.flavor_reviews.map(flavorReviewObj => {
    //   return (
    //     <Comment>
    //       <Comment.Avatar src={flavorReviewObj.user.profile_img} alt={flavorReviewObj.user.username} />
    //       <Comment.Content>
    //         <Comment.Author>{flavorReviewObj.user.username}</Comment.Author>
    //         <Comment.Text>
    //           {flavorReviewObj.content}
    //         </Comment.Text>
    //         <Comment.Text>
    //           Rating: {flavorReviewObj.rating}
    //         </Comment.Text>
    //         <Comment.Actions>
    //           {loggedInUser.username ? <Comment.Action>Message {flavorReviewObj.user.username}
    //              </Comment.Action> : null }
    //           {/* {loggedInUser.username ? <Comment.Action><Icon name='trash alternate' onClick={handleReviewDelete}/></Comment.Action> : null} */}
    //         </Comment.Actions>
    //       </Comment.Content>
    //     </Comment>
    //   )
    // })
   

    return (
      <div>
        <Image src={flavorInfo.image_url} alt={flavorInfo.name}
        onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
        />  
        <Modal
          dimmer={dimmer}
          open={open}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
          <Modal.Header>{flavorInfo.name}</Modal.Header>
          <Modal.Content image>
            <Image size='medium' src={flavorInfo.image_url} 
              alt={flavorInfo.name} wrapped />
            <Modal.Description>
              <Header>Description:</Header>
              <p>{flavorInfo.description}</p>
              <p>From: <a href={flavorInfo.shop.website} target="_blank" rel="noreferrer">{flavorInfo.shop.name}</a></p>
              <p>Average Rating: {flavorInfo.aver}</p>
              <Header>Reviews:</Header>
              <Comment.Group>
                {/* {flavorReviewArr} */}
              </Comment.Group>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {loggedInUser.username ? <ReviewForm /> : null}
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default FlavorModal