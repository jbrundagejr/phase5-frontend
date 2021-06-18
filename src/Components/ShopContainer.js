import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Menu, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ShopMap from './ShopMap'

function ShopContainer(){
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch("http://localhost:3000/shops")
      .then(res => res.json())
      .then(shopData => {
        dispatch({type: "SET_SHOP_ARR", payload: shopData})
      })
  }, [dispatch])
  
  const shopArr = useSelector(state => state.shopReducer.shops)
    
  const shopsArray = shopArr.map(shopObj => {
    return (
      <Menu.Item
      key={`${shopObj.id}`}>
      <Link to={`/shops/${shopObj.id}`}>
            {shopObj.name}
      </Link>
         </Menu.Item>
    )
  })

  return(
    <div id="mainShopContainer">
      <h2>Shops in NYC</h2>
      <Menu fluid widths={6} attached='top' tabular>
        {shopsArray}
      </Menu>
      <Segment attached='bottom'>
        <ShopMap />
      </Segment>
    </div>
  )
}

export default ShopContainer