import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Search from './Search'
import { SERVER_URL } from '../server_url.js'

function FlavorContainer(){
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch(`${SERVER_URL}/flavors`)
      .then(res => res.json())
      .then(flavorData => {
        dispatch({type: "SET_FLAVOR_ARR", payload: flavorData})
      })
  }, [dispatch])

  const flavorsArr = useSelector(state => state.flavorReducer.flavors)

  const flavorArray = flavorsArr.map(flavorObj => {
    return (
      <Card key={flavorObj.id} color="orange">
        <Link to={`/flavors/${flavorObj.id}`}>
          <Image src={flavorObj.image_url} alt={flavorObj.name}></Image>
        </Link>
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
    <div id="flavorContainer">
      <div id="flavorContainerHeader">
        <h2>Flavors</h2>
        <Search />
      </div>
      <div className="ui link four cards" id="card-collection">
        {flavorArray}
      </div>
    </div>
  )
}

export default FlavorContainer