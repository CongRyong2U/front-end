import React, { useEffect } from 'react';
import styled, {css} from "styled-components";
import Navbar from "../components/Navbar";
import PlaceListItem from '../components/PlaceListItem';
import { useState, useCallback } from "react";
import Map from "../components/GoogleMap";
import SelectModal from '../components/SelectModal';
import axios from 'axios';

const PageContainer = styled.div`
    
`
const PlaceTemplateBlock = styled.div `
  width: 420px;
  height: 800px;
  position: relative;
  top: -1000px;
  z-index: 500;
  overflow: scroll;
  ::-webkit-scrollbar {
  display: none;
}
`
const CategoryBlock = styled.div`
  width: 600px;
  height: 70px;
  padding-left: 15px;
  padding-top: 20px;
  position: relative;
  top: -1000px;
  z-index: 500;
`
const CategoryItem = styled.div`
  height: 20px;
  background: #EAEAEA;
  margin: 10px 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  font-size: 20px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px gray;
  &:hover { background: lightgray }
  ${props =>
    props.active && css`
    font-weight: 600;
    background: gray;
    `
  }
`

const MapBlock = styled.div`
  z-index: 0;
  height: 990px;
`

const SelectPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [stageId, setStageId] = useState("")
  const [places, setPlaces] = useState([])
  const [place, setPlace] = useState("")
  const [placesArray, setPlacesArray] = useState([]) //원본배열

  useEffect(() => {
    axios.get("https://ggg-server.herokuapp.com/api/stage/list").then((response) => {
      console.log(response.data.stageList)
      setPlaces(response.data.stageList)
      setPlacesArray(response.data.stageList)
    })
  },[])

  useEffect(() => {
    axios.get(`https://ggg-server.herokuapp.com/api/stage/detail/${stageId&&stageId}`).then((response) => {
      console.log(response.data.stage)
      setPlace(response.data.stage)
    })
  },[stageId])

  const categories = [
    {name: '전체', text:'전체'},
    {name: '과학자', text:'과학자'},
    {name: '공학자', text:'공학자'},
    {name: '기업인', text:'기업인'},
    {name: '정치인', text:'정치인'},
    {name: '인권운동가', text:'인권운동가'},
  ]

  const [category, setCategory] = useState('전체');
  const onSelect = (category) => {
    setCategory(category)
    if (category==='전체') setPlaces(placesArray)
    else {
    const cate = placesArray.filter(place => {if (category == place.category) return place });
    console.log(category);
    setPlaces(cate);
    }
  };

  const Categories = ({ onSelect, category }) => {
    return (
      <CategoryBlock>
          {categories.map(c => (
            <CategoryItem key={c.name}
              active={category===c.name}
              onClick={() => onSelect(c.name)}
            >{c.text}</CategoryItem>
          ))}
      </CategoryBlock>
    );
  };

  const PlaceList = ({data, category}) => {
    
    return (
      <PlaceTemplateBlock>
        {places?.map((data, index) => (
          <PlaceListItem data={data} key={index} setModalOpen={setModalOpen} setStageId={setStageId} />
        ))}
      </PlaceTemplateBlock>
    );
  };

  return (
    <PageContainer>
      <Navbar />
      <MapBlock>
        <Map setModalOpen={setModalOpen} setStageId={setStageId}/>
        <Categories category={category} onSelect={onSelect} />
        <PlaceList category={category} />
        {modalOpen && <SelectModal setModalOpen={setModalOpen} id={stageId} data={place} />}
      </MapBlock>
    </PageContainer>
  );
};

export default SelectPage;