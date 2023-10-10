import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Container=styled.div`
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    padding: 0px 10px;
    background-color: white;
`;

const Left=styled.div``;

const Logo=styled.span`
    font-size: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const Center=styled.div``;

const Menu=styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
`;

const Item=styled(Link)`
    text-decoration: none;
    color: black;
    display: flex;
    gap: 5px;
    padding: 10px;
    border-radius: 10px;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    };
    cursor: pointer;
`;

const Right=styled.div``;

export default function Navbar() {
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

      </Right>
    </Container>
  );
}
