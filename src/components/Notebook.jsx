import React from 'react';
import styled from 'styled-components';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Notes from './Notes';
import Popup from 'reactjs-popup';
import Note_Link from './Note_Link';
import Checklist_Link from './Checklist_Link'
import CheckList from './CheckList';
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

const Add=styled.div`
    position: absolute;
    right: 40px;
    display: flex;
    gap: 10px;
    align-items: center;
`;

const Write=styled.div`
    display: flex;
    gap: 3px;
    align-items: center;
    font-size: 15px;
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
    gap: 80px;
    flex-wrap: wrap;
`;

const Button=styled.div`
    outline: none;
    cursor: pointer;
`;
export default function Notebook() {
  return (
    <Container>
         <Head>
            First Notebook
            <Add>
                <Write><EditNoteIcon/> Write</Write>
                <Write><ChecklistRtlIcon/> To-Do</Write>
            </Add>
        </Head>
        <Wrapper>
            <Popup
                trigger={<Button><Note_Link/></Button>}
                modal nested
                >
                <Notes/>
            </Popup>
            <Popup
                trigger={<Button><Checklist_Link/></Button>}
                modal nested
                >
                <CheckList/>
            </Popup>
        </Wrapper>
      
    </Container>
  );
}
