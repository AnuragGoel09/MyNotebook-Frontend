import React from 'react';
import styled from 'styled-components'
import Notebook_Link from '../components/Notebook_Link';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Container=styled.div`
    width: 100vw;
    box-sizing: border-box;
    min-height: calc(100vh - 80px);
`;

const Head=styled.span`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
    font-size: 25px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const AddNotebook=styled.div`
    position: absolute;
    right: 40px;
    display: flex;
    align-items: center;
    font-size: 17px;
    padding: 5px;
    &:hover{
        background-color: rgba(0,0,0,0.05);
    };
    cursor: pointer;
`;

const Wrapper=styled.div`
    box-sizing: border-box;
    padding: 60px 50px;
    display: flex;
    gap: 120px;
    flex-wrap: wrap;
`;

const Links=styled(Link)`
    text-decoration: none;
`;

export default function Home() {
  return (
    <Container>
        <Head>
            Notebooks
            <AddNotebook><AddIcon/> Notebook</AddNotebook>
        </Head>
        <Wrapper>
            <Links><Notebook_Link/></Links>
            <Links><Notebook_Link/></Links>
        </Wrapper>
    </Container>
  );
}