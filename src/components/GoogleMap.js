import React from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from "react";
import axios from 'axios';
import SelectModal from "./SelectModal";

const containerStyle = {
  width: '100%',
  height: '990px'
};

const center = {
  lat: 37.5,
  lng: 127
};

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  })

  const [map, setMap] = React.useState(null)
  const [locations, setLocations] = useState([])
  const [stageId, setStageId] = useState("")
  const [place, setPlace] = useState("")

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(5)
    setMap(map)
  }, [])
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  useEffect(() => {
    axios.get("https://ggg-server.herokuapp.com/api/stage/list").then((response) => {
      console.log(response.data.stageList)
      setLocations(response.data.stageList)
    })
  },[])

  useEffect(() => {
    axios.get(`https://ggg-server.herokuapp.com/api/stage/detail/${stageId&&stageId&&stageId}`).then((response) => {
      console.log(response.data.stage)
      setPlace(response.data.stage)
    })
  },[stageId])

  const LocationList = locations?.map((data, index) => {
    const location = {
      lat: data.lat,
      lng: data.lng
    }
    const showModal = () => {
      props.setStageId(data._id);
      props.setModalOpen(true);
    };
    return (
      <MarkerF position={location} data={data} key={index} onClick={showModal} />
    )
  })

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {LocationList}
        <></>
      </GoogleMap>

    </div>
  ) : <></>
}

export default React.memo(Map)