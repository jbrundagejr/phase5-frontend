import {useState} from 'react'
import {Input} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'

function Search(){
  const [searchedFlavor, setSearchedFlavor] = useState("")
  const flavorsArr = useSelector(state => state.flavors.flavors)
  const dispatch = useDispatch()
  
  function whatUserTyped(e){
    setSearchedFlavor(e.target.value)
  }

  return (
    <div>
       <div class= "ui input" >
        <Input 
          type="text" 
          id="search" 
          placeholder="Search by name, type, flavor..." 
          value={searchedFlavor} 
          onChange={whatUserTyped}
        ></Input>
        <i class="search icon"></i>
      </div>
    </div>
  )
}

export default Search