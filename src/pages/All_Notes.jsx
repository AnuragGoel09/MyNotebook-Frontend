import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import ChecklistContext from '../context/checklists/checklistContext';
import Popup from 'reactjs-popup';
import Checklist_Link from '../components/Checklist_Link';
import Note_Link from '../components/Note_Link';
import Notes from '../components/Notes';
import CheckList from '../components/CheckList';
import DeleteIcon from '@mui/icons-material/Delete';

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
const Wrapper=styled.div`
    box-sizing: border-box;
    padding: 60px 50px;
    display: flex;
    gap: 80px;
    flex-wrap: wrap;
`;

const Box=styled.div`
    position: relative;
    &:hover .del{
        display: block;
    }
`;

const Delete=styled.div`
    position: absolute;
    display: none;
    top: 0;
    right: 0;
    background-color: grey;
    border-radius: 10px;
    padding: 2px;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: black;
    }

`;
const Button=styled.div`
    outline: none;
    cursor: pointer;
`;

export default function All_Notes() {
  
  
  
    return (
    <Container>  
      <Navbar/>
      <Head>
         All Notes
      </Head>
      <Wrapper>
      </Wrapper>
    </Container>
  );
}
