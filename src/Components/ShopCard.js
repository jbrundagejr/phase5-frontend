import {Card} from 'semantic-ui-react'
import ShopModal from './ShopModal'

function ShopCard({shop}){
  const {id, name} = shop
  
  return (
    <div>
      <Card color='violet'>
        <ShopModal id={id}/>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ShopCard