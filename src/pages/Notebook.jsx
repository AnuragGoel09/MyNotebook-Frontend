import React from 'react';
import styled from 'styled-components';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Notes from '../components/Notes';
import Popup from 'reactjs-popup';
import Note_Link from '../components/Note_Link';
import Checklist_Link from '../components/Checklist_Link'
import CheckList from '../components/CheckList';
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import ChecklistContext from '../context/checklists/checklistContext';

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
  
    const {noteState,setNoteState}=useContext(NoteContext);
    const {checklistState,setChecklistState}=useContext(ChecklistContext);
    
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
            {
                noteState.map((note)=>(
                    <Popup key={note._id}
                        trigger={<Button><Note_Link note={note}/></Button>}
                        modal nested
                        >
                        <Notes note={note}/>
                    </Popup>

                ))
            }
            {
                checklistState.map((checklist)=>(
                    <Popup key={checklist._id}
                        trigger={<Button><Checklist_Link checklist={checklist}/></Button>}
                        modal nested
                        >
                        <CheckList checklist={checklist}/>
                    </Popup>

                ))
            }
        </Wrapper>
      
    </Container>
  );
}
