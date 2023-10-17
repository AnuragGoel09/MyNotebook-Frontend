import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Edit_Notebook from './Edit_Notebook';
import DeleteIcon from '@mui/icons-material/Delete';
import NotebookContext from '../context/notebooks/notebookContext';

const Container=styled.div`
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Img=styled.img`
  width: 150px;
  height: 200px;
  object-fit: cover;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 2px 2px 10px #888888;
`;
const Edit=styled.div`
  position: absolute;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
  right: -9px;
  top: -9px;
  cursor: pointer;
  z-index: 999;
  &:hover{
    background-color: lightpink;
  }
`;

const Delete=styled.div`
position: absolute;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
  right: -9px;
  top: 30px;
  color: grey;
  cursor: pointer;
  z-index: 999;
  &:hover{
    background-color: lightpink;
  }`;

const Name=styled.div`
  font-size: 18px;
  color: rgba(0,0,0,0.8);
  font-weight: 400;
`;
const Links=styled(Link)`
    text-decoration: none;
`;

export default function Notebook_Link(props) {
  const [notebookName,setNotebookName]=useState(props.notebook.title);
  const {deleteNotebook}=useContext(NotebookContext)
  const deleteNB=()=>{
      deleteNotebook(props.notebook._id);
  }

  return (
    <Container>
      <Links to={`/${props.notebook._id}`}><Img src={props.notebook.image}/></Links>
      <Name>{props.notebook.title}</Name>
      <Popup
            trigger={<Edit><EditNoteOutlinedIcon/></Edit>}
            modal nested
            >
            <Edit_Notebook notebook={props.notebook}/>
        </Popup>
       <Delete onClick={deleteNB}><DeleteIcon/></Delete> 
    </Container>
  );
}
