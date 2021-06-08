import {useEffect, useState} from 'react'
import {Modal, Card, Image, Comment} from 'semantic-ui-react'

function ShopModal({id}){

  const [shop, setShop] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3000/shops/${id}`)
      .then(res => res.json())
      .then(shopData => {
        setShop(shopData)
        setIsLoaded(true)
      })
  }, [id])

  if (!isLoaded) return <p>Loading...</p>

  const {name, website, image_url, plus_code, flavors, reviews} = shop

  return(
    <div>
      
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Card><Image src={image_url} alt={name} wrapped ui={false} /></Card>}>
        <Modal.Header><h3>{name}</h3></Modal.Header>
        <Modal.Content image>
          <Image size='medium' src={image_url} wrapped />
          <Modal.Description>
            <h3>{name}</h3>
            <a className="cardLink" href={website} target="_blank" rel="noreferrer">Website</a>
            {/* <p><span>Average User Rating:</span> {starRatingDecimal(averageRating(reviews))} </p> */}
          <Comment.Group>
            <h3>Reviews</h3>
          </Comment.Group>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  )
}

export default ShopModal