import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container=styled.div`
    width: 100vw;
    height: 100vh;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 100px;
`;
const Img=styled.img`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`;

const Box=styled.div`
    background-color: white;
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    border-radius: 20px;
    gap: 20px;
    ;
`;

const Head=styled.div`
    font-size: 22px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
`;

const Form=styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const Input=styled.input`
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    padding: 5px;
    border-bottom: 1px solid grey;
    font-size: 20px;
`;

const Submit=styled.button`
    width: 100%;
    padding: 15px;
    font-size: 20px;
    border-radius: 10px;
    border: 1px solid darkblue;
    cursor: pointer;
    background-color: lightblue;
    &:hover{
        background-color: cyan;
    }

`;

const Create=styled.div`
    width: 100%;
`;
const Linkitem=styled(Link)`
    text-decoration: none;
    &:hover{
        color: red;
    }
`;

export default function SignUp() {
  return (
    <Container>
            <Img src="./static/background.jpg"/>
            <Box>
                <Head>Signup</Head>
                <Form>
                    <Input type='text' required placeholder='Name'/>
                    <Input type='email' required placeholder='Email'/>
                    <Input type='password' required placeholder='Password'/>
                    <Submit type='submit'>Signup</Submit>
                </Form>
                <Create>
                    <Linkitem to="/login">Login Account</Linkitem>
                </Create>
            </Box>
    </Container>
  );
}
