import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const PageContainer = styled.div`
  background: linear-gradient(#252A34, #252A34, #08D9D6);
  display: flex;
  flex-flow: wrap;
  height: 850px;
`

const LeftContainer = styled.div`
  width: 1000px;  
`

const MainImage = styled.img`
  display: inline-block;
  width: 700px;
  height: 700px;
  margin: 40px 0 0 300px;
`

const RightContainer = styled.div`
  width: 700px;
  margin: 100px 0;
`
const Explain = styled.div`
  width: 500px;
  height: 400px;
  background: #ffffff88;
  padding: 40px;
  font-size: 24px;
  margin: 0 0 40px 40px;
`

const ExplainImg = styled.img`
  width: 500px;
  height: 400px;
  background: #ffffff44;
  padding: 40px;
  font-size: 24px;
  margin: 0 0 40px 40px;
`

const MapButton = styled(Link)`
  text-decoration: none;
  text-align: center;
  margin: 0 120px;
`;

const ButtonShape = styled.div`
  display: inline-block;
  width: 400px;
  background-color: #FF2E63;
  color: white;
  font-weight: bold;
  font-size: 40px;
  border-radius: 200px;
  padding: 30px 0;
`;

const ButtonIcon = styled.img`
  width: 1em;
  display: inline-block;
`

const MainPage = () => {
    
  return (
    <>
    <Navbar />
    <PageContainer>
      <LeftContainer>
        <MainImage src={require("../image/main_img_logo.png")} alt={`GGG 대문 이미지`} />
      </LeftContainer>
      <RightContainer>
        <ExplainImg src={require("../image/main_text.png")} alt={`GGG 설명`} />
        <MapButton to={`/select`}>
          <ButtonShape >
            <ButtonIcon src={require("../image/ic_globe.png")} alt={`map`} />
            &nbsp;&nbsp;Let's Globe
          </ButtonShape>
        </MapButton>
      </RightContainer>
    </PageContainer>
    </>
  );
};

export default MainPage;