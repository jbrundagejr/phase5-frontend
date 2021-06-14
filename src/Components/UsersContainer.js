import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function UserContainer(){
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(userData => {
        dispatch({type: "SET_USER_ARR", payload: userData})
      })
  }, [dispatch])

  const usersArr = useSelector(state => state.userReducer.users)

  const userArray = usersArr.map(userObj => {
    return (
    <Card key={userObj.id}>
      <Image src={userObj.profile_img} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={`/profile/${userObj.id}`}>{userObj.username}</Link>
        </Card.Header>
      </Card.Content>
    </Card>
    )
  })

  return(
    <div>
      <h2>Fellow Ice Cream Lovers</h2>
      <div className="ui link four cards">
      {userArray}
      </div>
    </div>
  )
}

export default UserContainer