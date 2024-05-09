import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Notes from '../components/Notes';
import Popup from 'reactjs-popup';
import NoteLink from '../components/NoteLink';
import ChecklistLink from '../components/ChecklistLink'
import CheckList from '../components/CheckList';
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import ChecklistContext from '../context/checklists/checklistContext';
import { useLocation } from 'react-router-dom';
import NotebookContext from '../context/notebooks/notebookContext';
import Navbar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingBar from 'react-top-loading-bar';
import { mobile } from '../responsive';
import Loader from '../components/Loader';
import BounceLoader from "react-spinners/BounceLoader";
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
    margin-top: 15px;
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
    ${mobile({justifyContent:'center'})}
`;

const Button=styled.div`
    outline: none;
    cursor: pointer;
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
    background-color: black;
    border-radius: 10px;
    padding: 5px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    &:hover{
        transform: scale(1.1);
    }

`;

const Load=styled.div`
    display: flex;
    /* gap: 3px; */
    align-items: center;
    justify-content: center;
    /* font-size: 15px; */
    /* padding: 5px; */
    /* &:hover{
        background-color: rgba(0,0,0,0.05);
    };
    cursor: pointer; */
`;

export default function Notebook() {
    const [show,setShow]=useState(false);
    const {notes, addNote, deleteNote, getNotes }=useContext(NoteContext);
    const {lists, addList, deleteList, getLists }=useContext(ChecklistContext);
    const {notebooks}=useContext(NotebookContext);
    const location=useLocation();
    const notebookId=location.pathname.substring(1, location.pathname.length);
    const [currNotebook,setCurrNotebook]=useState(null);
    const [progress,updateProgress]=useState(true);
    const [addNoteProgress,setAddNote]=useState(false);
    const [addListProgress,setAddList]=useState(false);
    useEffect(()=>{
        getNotes(notebookId);
        getLists(notebookId);
        for(let i=0;i<notebooks.length;i++){
            if(notebooks._id===notebookId){
                setCurrNotebook(notebooks[i]);
                break;
            }
        }
        updateProgress(false);
    },[]);
    useEffect(()=>{
        if(progress===false){
            setShow(true);
        }
    },[progress])
    useEffect(()=>{
        setAddNote(false)
    },[notes])
    useEffect(()=>{
        setAddList(false)
    },[lists])
    return (
        <>
        <Navbar/>
        {progress && <Loader/>}
        {!progress &&
        <>
    <Container>
         <Head>
            {currNotebook && currNotebook.title}
            <Add>
                {
                    addNoteProgress==true?<Load><BounceLoader size="20" color="black"/></Load>:
                <Write onClick={()=>{
                    setAddNote(true)
                    addNote(notebookId)
                }}><EditNoteIcon/> Write</Write>
            }
            {
                    addListProgress==true?<Load><BounceLoader size="20" color="black"/></Load>:
                    <Write onClick={()=>{
                        setAddList(true)
                        addList(notebookId)
                        }}><ChecklistRtlIcon/> To-Do</Write>
            }
            </Add>
        </Head>
        {
            show && 
        <Wrapper>
            {
                notes.map((note)=>( 
                    <Box  key={note._id}>
                        <Popup
                            trigger={<Button key={note._id}><NoteLink note={note}/></Button>}
                            modal nested
                            >
                            <Notes  key={note._id} note={note}/>
                        </Popup>
                        <Delete className='del' onClick={()=>{
                            deleteNote(note._id)
                        }}><DeleteIcon style={{fontSize:'20px'}}/></Delete>
                    </Box>
                ))
            }
            {
                lists.map((checklist)=>(
                    <Box  key={checklist._id}>
                        <Popup key={checklist._id}
                            trigger={<Button key={checklist._id}><ChecklistLink checklist={checklist}/></Button>}
                            modal nested
                            >
                            <CheckList key={checklist._id} checklist={checklist}/>
                        </Popup>
                        <Delete className='del' onClick={()=>{
                            deleteList(checklist._id)
                        }}><DeleteIcon style={{fontSize:'20px'}}/></Delete>
                    </Box>

))
            }
        </Wrapper>
        }
      
    </Container>
    </>
    }
    </>
  );
}
