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
  }

  return (
    <div>
      <div className= "ui input" >
        <Input 
          className="input"
          type="text" 
          id="search" 
          placeholder="Search by name, shop, ingredients..." 
          value={searchedFlavor} 
          onChange={whatUserTyped}
        ></Input>
      </div>
    </div>
  )
}

export default Search