import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Image} from 'semantic-ui-react'

function FlavorContainer(){
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch("http://localhost:3000/flavors")
      .then(res => res.json())
      .then(flavorData => {
        dispatch({type: "SET_FLAVOR_ARR", payload: flavorData})
      })
  }, [dispatch])

  const flavorsArr = useSelector(state => state.flavors.flavors)

  const flavorArray = flavorsArr.map(flavorObj => {
    return (
    <Card key={flavorObj.id}>
      <Image src={flavorObj.image_url} wrapped ui={false} />
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