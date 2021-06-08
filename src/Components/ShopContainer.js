import {useEffect, useState} from 'react'
import ShopCard from './ShopCard'


function ShopContainer(){
  const [shopArr, setShopArr] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/shops")
      .then(res => res.json())
      .then(shopData => setShopArr(shopData))
  }, [])

  const cardArr = shopArr.map(shopObj => 
    <ShopCard key={shopObj.id} shop={shopObj} />
  )

  return(
    <div>
      <h1>Shops in New York City</h1>
      {cardArr}
    </div>
  )
}

export default ShopContainer