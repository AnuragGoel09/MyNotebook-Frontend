import React from 'react';
import styled from 'styled-components';

const Container=styled.div`
    width: 50vw;
    height: 70vh;
    background-color:lightpink;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;

const Head=styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    padding: 20px;
`;

const Details=styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Text1=styled.div`
    width: 100%;
    text-align: left;
    margin: 5px 0px;
    font-size: 20px;
`;

const Title=styled.input`
    width: 100%;
    padding: 10px;
    font-size: 20px;
    border: none;
    outline: none;
    border-radius: 16px;
`;

const Text2=styled.div`
    width: 100%;
    text-align: left;
    margin: 20px 0px 5px 0px;
    font-size: 20px;
`;

export default function Edit_Notebook() {
  return (
    <Container>
        <Head>Personalize Your Notebook</Head>
        <Details>
            <Text1>Title:</Text1>
            <Title/>
            <Text2>Notebook Cover:</Text2>
        </Details>
    </Container>
  );
}
