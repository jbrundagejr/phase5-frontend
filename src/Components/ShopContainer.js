import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Menu, Segment, Card, Image, Icon, Comment} from 'semantic-ui-react'
import ShopMap from './ShopMap'
import {Link} from 'react-router-dom'

function ShopContainer(){
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch("http://localhost:3000/shops")
      .then(res => res.json())
      .then(shopData => {
        dispatch({type: "SET_SHOP_ARR", payload: shopData})
      })
  }, [dispatch])
  
  const loggedInUser = useSelector(state => state.userReducer.user)
  const shopArr = useSelector(state => state.shopReducer.shops)

  const shopsArray = shopArr.map(shopObj => {
    return (
      <Menu.Item
            key={`${shopObj.id}`}
            name={`${shopObj.name}`}
            // active={activeItem === `${shopObj.name}`}
            onClick={() => dispatch({type: "SET_SELECTED_SHOP", payload: shopObj})}
          />
    )
  })

  const shopInfo = useSelector(state => state.shopReducer.shop)


  return(
    <div>
      <h2>Shops in NYC</h2>
      <Menu attached='top' tabular>
        {shopsArray}
      </Menu>
      <Segment attached='bottom'>
        <Card>
          <Image src={shopInfo.image_url} alt={shopInfo.name} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{shopInfo.name}</Card.Header>
          </Card.Content>
        </Card>
        <ShopMap />
      </Segment>
    </div>
  )
}

export default ShopContainer