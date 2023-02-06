import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavContainer = styled.div`
  height: 60px;
  background-color: black;
  padding: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 40px;
  margin: 0 20px;
`

const MenuWrapper = styled.div`
  display: inline-block; 
`

const Text = styled.div`
  display: inline-block;
  color: white;
  margin: 20px;
`

const TextLink = styled(Link)`
  text-decoration: none;
`

const AuthWrapper = styled.div`
  display: inline-block;
  margin-left: auto;
`

const NavPage = (props) => {
  const user = useSelector((store) => store.userReducer.userId);
    
  return (
    <NavContainer>
      <TextLink to={'/'}>
        <LogoImage src={require("../image/GGG_icon_white.png")} alt={`GGG logo`} />
      </TextLink>
      <MenuWrapper>
        <TextLink to={'/'}>
          <Text>메인화면</Text>
        </TextLink>
        <TextLink to={'/select'}>
          <Text>스테이지 선택</Text>
        </TextLink>
        <TextLink to={'/my'}>
          <Text>일러스트 열람</Text>
        </TextLink>
      </MenuWrapper>
      { user ? (
          <>
            <AuthWrapper>
              <TextLink to={'/my'}>
                <Text>마이페이지</Text>
              </TextLink>
              <TextLink to={'/logout'}>
                <Text>로그아웃</Text>
              </TextLink>
            </AuthWrapper>
          </>
      ) : (
        <>
          <AuthWrapper>
            <TextLink to={'/login'}>
              <Text>로그인</Text>
            </TextLink>
            <TextLink to={'/signup'}>
              <Text>회원가입</Text>
            </TextLink>
          </AuthWrapper>
        </>
      )}
    </NavContainer>
  );
};

export default NavPage;