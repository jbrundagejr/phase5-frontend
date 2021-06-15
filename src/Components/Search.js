import {useState} from 'react'
import {Input, Icon} from 'semantic-ui-react'
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
  }

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
        {/* <Icon name="search icon"></Icon> */}
      </div>
    </div>
  )
}

export default Search