import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Menu, Segment} from 'semantic-ui-react'

function ShopContainer(){
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    fetch("http://localhost:3000/shops")
      .then(res => res.json())
      .then(shopData => {
        dispatch({type: "SET_SHOP_ARR", payload: shopData})
      })
  }, [dispatch])

  const shopArr = useSelector(state => state.shops.shops)

  const shopsArray = shopArr.map(shopObj => {
    return (
      <Menu.Item
            key={`${shopObj.id}`}
            name={`${shopObj.name}`}
            // active={activeItem === `${shopObj.name}`}
            // onClick={this.handleItemClick}
          />
    )
  })

  return(
    <div>
      <h2>Shops in NYC</h2>
      <Menu attached='top' tabular>
        {shopsArray}
      </Menu>
      <Segment attached='bottom'>
        
      </Segment>
    </div>
  )
}

export default ShopContainer