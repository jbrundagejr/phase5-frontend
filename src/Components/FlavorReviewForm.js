import {Form, TextArea, Rating, Button} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import { SERVER_URL } from '../server_url'

function FlavorReviewForm(){
  const [userContent, setUserContent] = useState("")
  const [userRating, setUserRating] = useState("")
  const flavorInfo = useSelector(state => state.flavorReducer.flavor)
  const flavorReviewInfo = useSelector(state => state.flavorReducer.flavor_reviews)
  const dispatch = useDispatch()

  function rateFlavor(e, {rating, maxRating}){
    setUserRating({rating, maxRating})
  }

  function handleReviewSubmit(e){
    e.preventDefault()
    const newFlavorReview = {
      flavor_id: flavorInfo.id,
      content: userContent,
      rating: userRating.rating
    }
    fetch(`${SERVER_URL}/flavor_reviews`, {
      method: "POST",
      headers: {
        "Authorization": localStorage.token,
        "content-type": "application/json"
      },
      body: JSON.stringify(newFlavorReview)
    })
    .then(res => res.json())
    .then(newReview => {
      const newFlavorReviewArr = [...flavorReviewInfo, newReview]
      dispatch({type: "ADD_FLAVOR_REVIEW", payload: newFlavorReviewArr})
      setUserContent("")
    })
  }
  
  return (
    <Form onSubmit={handleReviewSubmit} reply>
      <TextArea value={userContent} placeholder="Your Review" onChange={e => setUserContent(e.target.value)}/>
      <Rating icon="heart" size="huge" onRate={rateFlavor} value={userRating} maxRating={5} clearable/>
      <br/>
      <Button color='purple' content='Add Review' labelPosition='left' icon='share square outline' primary />
    </Form>
  )
}

export default FlavorReviewForm