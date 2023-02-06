import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Illust from '../components/Illust';
import LockedIllust from '../components/LockedIllust';
import IllustModal from '../components/IllustModal';
import LockedIllustModal from '../components/LockedIllustModal';
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";

const PageContainer = styled.div`
    height: 2200px;
`

const UserInfoContainer = styled.div`
  height: 150px;
  background-color: #252A34;
  padding: 15px 100px;
  color: white;
`

const IconContainer = styled.img`
  float:right;
  height: 150px;
  width: 150px;
`;

const IllustTitleContainer = styled.h1`
    margin: 30px 30px 30px 100px;
`


const MyPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [illust, setillust] = useState([]); //일러스트 상세 정보
  const [illustId, setillustId] = useState([]); //선택한 일러스트 (모달창)
  const [list, setList] = useState([]); //일러스트 전체 목록
  const [info, setInfo] = useState([]); //유저 정보
  const [userIllust, setuserIllust] = useState([]); //유저 일러스트 목록
  const [userItem, setuserItem] = useState([]); //유저 아이템 목록

  const userId = useSelector((store) => store.userReducer.userId);

  useEffect(() => {
  axios.get(`https://ggg-server.herokuapp.com/api/illust/detail/${illustId&&illustId}`).then((response) => {
      //console.log(response.data.illust)
      setillust(response.data.illust)
  })
  },[illustId]);

  useEffect(() => {
    axios.get("https://ggg-server.herokuapp.com/api/illust/list").then((response1) => {
      //console.log(response1.data.illustList)
      setList(response1.data.illustList)
    })
  }, []);

  useEffect(() => {
      let body = {
      _id: userId&&userId
    }
    axios.post("https://ggg-server.herokuapp.com/api/users/collection", body).then((response2) => {
      //console.log(response2.data.collection)
      let illustList = response2.data.collection.illustList
      illustList = illustList.map(function(illust){ return illust._id; });
      setuserIllust(illustList)
      let itemList = response2.data.collection.itemList
      itemList = itemList.map(function(item){
        return {illustId: item.illustId._id, itemName: item.illustId.stageId.itemName, count: item.count};
      })
      setuserItem(itemList)
      
      //console.log(illustList);
      //console.log(itemList);
    })
  },[]);

  useEffect(() => {
    let body = {
      _id: userId&&userId
    }
    axios.post("https://ggg-server.herokuapp.com/api/users/info", body).then((response) => {
      //console.log(response.data.user)
      setInfo(response.data.user)
    })
  },[userId]);
  
  const Illustlist = list?.map((data, index) => {
    const item = userItem.find(item => {if (item.illustId == data._id) return item})
    if ((userIllust).includes(data._id)) {
        return <Illust data={data} key={index} setModalOpen={setModalOpen} setillustId={setillustId}/>
    } else {
      //console.log(`아이템 ${item}`);
      return <LockedIllust data={data} item={item} key={index} setModalOpen={setModalOpen} setillustId={setillustId}/>
    }
  });

  return (
    <PageContainer>
      <Navbar />
      { userId &&
        <UserInfoContainer>
          <div style={{float: 'left'}}>
            <h1>{info.name}<> 님</></h1>
            <h3>{info.email}<br/>해금 일러스트 수 : {userIllust.length} / 14</h3>
          </div>
          <IconContainer alt="logo" src={require("../image/main_img_logo.png")}/>
        </UserInfoContainer>
      }
      {
        userItem ? (
          <>
        <IllustTitleContainer>
          일러스트 목록
        </IllustTitleContainer>
        {Illustlist}
        {/* {(modalOpen && (userIllust).includes(illustId)) ? <IllustModal setModalOpen={setModalOpen} data={illust}/> : <LockedIllustModal setModalOpen={setModalOpen} data={illust}/>} */}
        {(modalOpen && (userIllust).includes(illustId)) && <IllustModal setModalOpen={setModalOpen} data={illust}/> }
        {(modalOpen && !((userIllust).includes(illustId))) && <LockedIllustModal setModalOpen={setModalOpen} data={illust}/>}
        </>
      ) : (
        <></>
      )}
    </PageContainer>
    
  );
};


export default MyPage;