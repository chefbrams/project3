import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_DESTINATION, UPDATE_LOCATION } from "../utils/actions";

function MapComponent(props) {
  Geocode.setApiKey(process.env.REACT_APP_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("us");
  Geocode.enableDebug();

  const { id } = useParams();
  console.log(props)
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    API.getPost(id)
      .then(res => {
        Geocode.fromAddress(res.data.location).then(
          response => {
            dispatch({ type: UPDATE_LOCATION, location: response.results[0].geometry.location })
          },
          error => {
            console.error(error);
          }
        ).catch(err => {
          console.log(err)
        });
      })
      .catch(err => console.log(err));
      API.getPost(id)
      .then(res => {
        Geocode.fromAddress(res.data.destination).then(
          response => {
            dispatch({ type: UPDATE_DESTINATION, destination: response.results[0].geometry.location })
          },
          error => {
            console.error(error);
          }
        ).catch(err => {
          console.log(err)
        });
      })
      .catch(err => console.log(err));
  }, [dispatch, id]); 

  const containerStyle = {
    width: '350px',
    height: '350px'
  };

  const locations = [
    state.currentLocation,
    state.currentDestination
  ];

  function createKey(location) {
    return location.lat + location.lng
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
    >
      <GoogleMap
        id="marker-example"
        mapContainerStyle={containerStyle}
        center={state.currentLocation}
        zoom={13}
      >
        <MarkerClusterer>
          {(clusterer) =>
            locations.map((location) => (
              <Marker key={createKey(location)} position={location} clusterer={clusterer} />
            ))
          }
        </MarkerClusterer>

        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapComponent)