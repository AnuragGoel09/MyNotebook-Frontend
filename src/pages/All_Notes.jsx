import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { useContext } from 'react';
import LoginContext from '../context/login/loginContext';
import Popup from 'reactjs-popup';
import NoteLink from '../components/NoteLink';
import ChecklistLink from '../components/ChecklistLink'
import CheckList from '../components/CheckList';
import DeleteIcon from '@mui/icons-material/Delete';
import Notes from '../components/Notes';
import NoteContext from '../context/notes/noteContext';
import ChecklistContext from '../context/checklists/checklistContext';
import LoadingBar from 'react-top-loading-bar';
import {apiURL} from '../config';
import { mobile } from '../responsive';
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
    ${mobile({justifyContent:'center'})}
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
    const {loginState}=useContext(LoginContext);
    const [allnotes,setAllnotes]=useState([]);
    const [alllists,setAlllists]=useState([]);
    const {deleteNote}=useContext(NoteContext);
    const {deleteList}=useContext(ChecklistContext);
    const [progress,updateProgress]=useState(0);
useEffect(()=>{
    const getAllNOtes=async()=>{

        try {
            
            const response = await fetch(`${apiURL}/api/notes/allnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": loginState.authtoken
                }
            });
            const json = await response.json();
            setAllnotes(json);
        } catch (error) {
      
        }
        updateProgress(70);
        try {
            const response = await fetch(`${apiURL}/api/lists/alllists`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": loginState.authtoken
                }
            });
            const json = await response.json();
            setAlllists(json);

            console.log(json)
        } catch (error) {
            
        }
        updateProgress(100);
    }
    updateProgress(30);
    getAllNOtes();
    },[loginState]);
    useEffect(()=>{
        if(progress===100){
            setShow(true);
        }
    },[progress])
  
    const [show,setShow]=useState(false);
    return (
    <Container>  
      <Navbar/>
      <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={()=>updateProgress(0)}
        />
        <Head>
            All Notes
        </Head>
        <Wrapper>
        {   show && 
                allnotes.map((note)=>(
                    
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
                 alllists.map((checklist)=>(
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
    </Container>
  );
}
