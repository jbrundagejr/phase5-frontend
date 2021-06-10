import {Form, Input, TextArea, Rating, Button} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'

function ReviewForm(){
  const [userContent, setUserContent] = useState("")
  const [userRating, setUserRating] = useState("")
  // const flavorInfo = useSelector(state => )
  const dispatch = useDispatch()

  function rateFlavor(e, {rating, maxRating}){
    setUserRating({rating, maxRating})
  }

  function handleReviewSubmit(e){
    e.preventDefault()
    const newFlavorReview = {
      // flavor_id: flavorInfo.id,
      content: userContent,
      rating: userRating.rating
    }
    fetch("http://localhost:3000/flavor_reviews", {
      method: "POST",
      headers: {
        "Authorization": localStorage.token,
        "content-type": "application/json"
      },
      body: JSON.stringify(newFlavorReview)
    })
    .then(res => res.json())
    .then(newReview => {
      dispatch({type: "ADD_FLAVOR_REVIEW", payload: newReview})
    })
  }
  return (
    <Form onSubmit={handleReviewSubmit} reply>
      <TextArea value={userContent} placeholder="Your Review" onChange={e => setUserContent(e.target.value)}/>
      <Rating onRate={rateFlavor} value={userRating} maxRating={5} clearable/>
      <br/>
      <Button content='Add Review' labelPosition='left' icon='edit' primary />
    </Form>
  )
}

export default ReviewForm