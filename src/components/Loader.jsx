import React from 'react'
import styled from 'styled-components'
import BounceLoader from "react-spinners/BounceLoader";
const Container=styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title=styled.div`
    position: absolute;
    width: 100%;
    left: 50px;
    top: 30px;
    text-align: left;
    justify-content: left;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: black;
    z-index: 99;
`;

export default function Loader() {
  return (
    <>
      <Container>
      <Title>My Notebook</Title>
        <BounceLoader color="black"/>
      </Container>
    </>
  )
}
