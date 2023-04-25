import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {Form, TextArea, Rating, Button} from 'semantic-ui-react'
import { SERVER_URL } from '../server_url'

function ReviewForm(){

  const [userContent, setUserContent] = useState("")
  const [userRating, setUserRating] = useState("")
  const shopInfo = useSelector(state => state.shopReducer.shop)
  const reviewInfo = useSelector(state => state.shopReducer.shop_reviews)
  const dispatch = useDispatch()

  function rateFlavor(e, {rating, maxRating}){
    setUserRating({rating, maxRating})
  }

  function handleReviewSubmit(e){
    e.preventDefault()
    const newReview = {
      shop_id: shopInfo.id,
      content: userContent,
      rating: userRating.rating
    }
    fetch(`${SERVER_URL}/reviews`, {
      method: "POST",
      headers: {
        "Authorization": localStorage.token,
        "content-type": "application/json"
      },
      body: JSON.stringify(newReview)
    })
    .then(res => res.json())
    .then(newReview => {
      const newReviewArr = [...reviewInfo, newReview]
      dispatch({type: "ADD_SHOP_REVIEW", payload: newReviewArr})
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

export default ReviewForm