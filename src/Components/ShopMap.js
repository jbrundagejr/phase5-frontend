import {useSelector} from 'react-redux'
import { GoogleMap, LoadScript } from '@react-google-maps/api';


function ShopMap(){
  const shopInfo = useSelector(state => state.shopReducer.shop)
  
  const containerStyle = {
    width: '400px',
    height: '400px'
  }
  
  const center = {
    lat: -3.745,
    lng: -38.523
  }

  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyA0XA6MS0Ui5t_YnJ_NednyZsZyYJ-aFKU"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >

          </GoogleMap>
        </LoadScript>
    </div>
  )
}

export default ShopMap