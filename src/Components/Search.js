import {useState} from 'react'
import {Input} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'

function Search(){
  const [searchedFlavor, setSearchedFlavor] = useState("")
  const flavorsArr = useSelector(state => state.flavorReducer.flavors)
  const dispatch = useDispatch()
  
  function whatUserTyped(e){
    setSearchedFlavor(e.target.value)
    const filteredFlavorArray = flavorsArr.filter(flavor => {
      if (flavor.name.toLowerCase().includes(searchedFlavor.toLowerCase())){
        return true
      } else if (flavor.description.toLowerCase().includes(searchedFlavor.toLocaleLowerCase())){
        return true
      } else {return (flavor.shop.name.toLowerCase().includes(searchedFlavor.toLocaleLowerCase()))}
    })
    dispatch({type: "SEARCH_FLAVORS", payload: filteredFlavorArray})
    console.log(searchedFlavor)
  }

  

  // const searchedBeerArr = beersByTypeAndState.filter((beer) => {
  //   if (beer.name.toLowerCase().includes(searchBeer.toLowerCase())){
  //     return true
  //   } else if (beer.type.toLowerCase().includes(searchBeer.toLowerCase())){
  //     return true
  //   } else if (beer.manufacturer.toLowerCase().includes(searchBeer.toLowerCase())){
  //     return true
  //   } else {return (beer.flavorProfile.toLowerCase().includes(searchBeer.toLowerCase()))}
  // })

  return (
    <div>
       <div class= "ui input" >
        <Input 
          type="text" 
          id="search" 
          placeholder="Search by name, shop, ingredients..." 
          value={searchedFlavor} 
          onChange={whatUserTyped}
          // onChange={() => dispatch({type: "SEARCH_FLAVORS", payload: filteredFlavorArray})}
        ></Input>
        <i class="search icon"></i>
      </div>
    </div>
  )
}

export default Search