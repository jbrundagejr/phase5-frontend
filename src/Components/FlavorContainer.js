import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Image} from 'semantic-ui-react'
import FlavorModal from './FlavorModal'

function FlavorContainer(){
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch("http://localhost:3000/flavors")
      .then(res => res.json())
      .then(flavorData => {
        dispatch({type: "SET_FLAVOR_ARR", payload: flavorData})
      })
  }, [dispatch])

  const flavorsArr = useSelector(state => state.flavorReducer.flavors)

  const flavorArray = flavorsArr.map(flavorObj => {
    return (
    <Card key={flavorObj.id} >
      <FlavorModal />
      <Image src={flavorObj.image_url} alt={flavorObj.name} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{flavorObj.name}</Card.Header>
        <Card.Meta>
          <a href={flavorObj.shop.website} target="_blank" rel="noreferrer">{flavorObj.shop.name}</a>
        </Card.Meta>
      </Card.Content>
    </Card>
    )
  })

  return(
    <div>
      <h2>Flavors</h2>
      <div className="ui link four cards">
      {flavorArray}
      </div>
    </div>
  )
}

export default FlavorContainer