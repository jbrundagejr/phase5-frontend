import {useSelector} from 'react-redux'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function ShopMap(){
  const flavorInfo = useSelector(state => state.flavorReducer.flavor)
  
  const containerStyle = {
    height: '250px',
    width: '250px'
  }
  
  const center = {
    lat: flavorInfo.shop.lat,
    lng: flavorInfo.shop.lng
  }

  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyA0XA6MS0Ui5t_YnJ_NednyZsZyYJ-aFKU"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12.5}
        >
          <Marker 
          position={{lat: flavorInfo.shop.lat, lng: flavorInfo.shop.lng}}
          getClickable={true}
        />
          </GoogleMap>
        </LoadScript>
    </div>
  )
}

export default ShopMap