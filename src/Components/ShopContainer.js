import {useEffect, useState} from 'react'


function ShopContainer(){
  const [shopArr, setShopArr] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/shops")
      .then(res => res.json())
      .then(shopData => setShopArr(shopData))
  }, [])

  return(
    <div>
      <h1>Shop Container</h1>
      
    </div>
  )
}

export default ShopContainer