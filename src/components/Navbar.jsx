import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginContext from '../context/login/loginContext';
import PortraitIcon from '@mui/icons-material/Portrait';
import { mobile ,tablet} from '../responsive';
const Container=styled.div`
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    padding: 0px 10px;
    background-color: black;
    ${tablet({flexDirection:'column',height:'fit-content'})}
`;

const Left=styled.div`
  ${mobile({width:'100%',textAlign:'left',marginBottom:'5px'})}
  ${tablet({marginBottom:'5px',marginTop:'10px'})}
`;

const Logo=styled.span`
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: whitesmoke;
`;

const Center=styled.div``;

const Menu=styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
`;

const Item=styled(Link)`
    text-decoration: none;
    background-color: whitesmoke;
    color: black;
    display: flex;
    gap: 5px;
    padding: 5px 10px;
    border-radius: 10px;
    transition: all 0.2s ease;
    &:hover{
        background-color: grey;
        transform: scale(1.1);
    };
    cursor: pointer;
`;

const Name=styled.span`
font-size: 18px;
display: flex;
color: white;
align-items: center;
gap: 5px;
`;

const Logout=styled(Link)`
  cursor: pointer;
  background-color: white;
  color:black;
  text-decoration: none;
  padding: 8px;
  border-radius: 10px;
  transition: all 0.2s ease;
  &:hover{
        background-color: grey;
        transform: scale(1.1);
    };
`;

const Right=styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  box-sizing: border-box;
  padding: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  ${tablet({width:'100%',justifyContent:'space-between'})}
`;

export default function Navbar() {

  const {loginState}=useContext(LoginContext);
  return (
    <Container>
      <Left>
            <Logo>My Notebook</Logo>
      </Left>
      <Center>
            <Menu>
                <Item to="/">My Notebooks <img height={'25px'} src="./nav-items/notebook.png" alt='notebook'/></Item>
                <Item to="/allnotes"><img height={'26px'} src="./nav-items/all-notes.png" alt='notes'/> All Notes</Item>
            </Menu>
      </Center>
      <Right>
          <Name><PortraitIcon/> {loginState?loginState.name:' '}</Name>
          <Logout to="/login">Logout</Logout>
      </Right>
    </Container>
  );
}
