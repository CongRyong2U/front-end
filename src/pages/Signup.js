import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  background: linear-gradient(#252A34, #252A34, #08D9D6);
  text-align: center;
  display: flex;
  flex-flow: wrap;
  height: 850px;
  
`
const LeftContainer=styled.div`
  width: 1000px;  

`
const RightContainer = styled.div`
  width: 700px;
  margin: 150px 0 0 0;
`
const MainImage = styled.img`
  display: inline-block;
  width: 700px;
  height: 700px;
  margin: 40px 0 0 300px;
`
const Form = styled.form`
  width: 300px;
  display: block;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
`
const Title = styled.div`
  color: white;
  font-weight: bold;
  font-size: 40px;
  margin: 20px;
`
const Input = styled.input`
  display: block;
  padding: 6px;
  margin: 20px;
  font-size: 20px;
`
const SignupButton = styled.button`
  display: inline-block;
  text-align: center;
  width: 200px;
  background-color: #FF2E63;
  color: white;
  font-weight: bold;
  font-size: 24px;
  border-radius: 100px;
  padding: 20px 0;
  margin: 30px;
  border: none;
  :hover {
    background-color: #252A34;
    cursor: pointer;
    }
`;
const Toast = styled.p`
  font-size: 20px !important;
  color: #000 !important;
`;

const Signup = () => {
    const navigate = useNavigate();
    const userId = useSelector((store) => store.userReducer.userId);
    useEffect(() => {
      if (userId) {
        navigate("/");
      }
    }, []);
    const submit = async (values) => {
      const { name, email, password } = values || {};
      let userInfo = {
        name: name,
        email: email,
        password: password,
      };
  
      axios.post("https://ggg-server.herokuapp.com/api/users/register", userInfo).then((response) => {
        console.log(response);
        if (response.data.success) {
          // 회원가입 성공
          toast.success(
            <Toast>
              회원가입에 성공하였습니다. <br />
              로그인해주세요!
            </Toast>,
            {
              position: "top-center",
              autoClose: 1800,
            }
          );
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      });
    };

  return (

    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={submit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <>
          <Navbar />
          <PageContainer>
            <LeftContainer>
              <MainImage src={require("../image/main_img.png")} alt={`GGG 대문 이미지`} />
            </LeftContainer>
            <RightContainer>
                <Form onSubmit={handleSubmit}>
                <Title>Welcome!</Title>
                  <Input
                    type="text"
                    name="name"
                    placeholder="닉네임"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    autoComplete="on"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    id="e-mail"
                    value={values.email}
                    onChange={handleChange}
                    autoComplete="on"
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    autoComplete="on"
                  />
                  <SignupButton type="submit">
                  Sign Up
                  </SignupButton>
                </Form>
            </RightContainer>
            <ToastContainer />
          </PageContainer>
        </>
      )}
    </Formik>
  );
};

export default Signup;