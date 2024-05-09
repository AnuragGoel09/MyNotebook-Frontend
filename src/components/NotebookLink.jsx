import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import {useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';
import Edit_Notebook from './Edit_Notebook';
import DeleteIcon from '@mui/icons-material/Delete';
import NotebookContext from '../context/notebooks/notebookContext';
import {motion} from 'framer-motion';
import BounceLoader from "react-spinners/BounceLoader";

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
  box-shadow: 2px 2px 10px black;
  transition: all 0.2s ease;
  &:hover{
    scale: 1.05;
  }
  cursor: pointer;
`;
const Edit=styled.div`
  position: absolute;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: black;
  right: -9px;
  top: -9px;
  cursor: pointer;
  z-index: 999;
  transition: all 0.2s ease;
  &:hover{
    scale: 1.1;
  }
`;

const Delete=styled(motion.div)`
position: absolute;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: black;
  right: -9px;
  top: 30px;
  z-index: 999;
  color: grey;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover{
    scale: 1.1;
  }
`;
const Name=styled.div`
  font-size: 18px;
  color: rgba(0,0,0,0.8);
  font-weight: 400;
`;

const Load=styled.div`
`;

export default function Notebook_Link(props) {
  const {deleteNotebook}=useContext(NotebookContext)
  const navigate=useNavigate();
  const deleteNB=()=>{
      deleteNotebook(props.notebook._id);
  }
  const [isDelete, setIsDelete] = useState(false);
  return (
    <>
      {isDelete && <Load><BounceLoader color="black"/></Load>}
      {!isDelete && <Container>
        <Img onClick={()=>{
                  navigate(`/${props.notebook._id}`);
                }}
            src={props.notebook.image}
        />
      <Name>{props.notebook.title}</Name>
      <Popup
            trigger={<Edit><EditNoteOutlinedIcon style={{color:'white'}}/></Edit>}
            modal nested
            >
            <Edit_Notebook notebook={props.notebook}/>
        </Popup>
       <Delete onClick={()=>{
                  setIsDelete(true);
                  setTimeout(()=>{
                  },200);
                  deleteNB();

                }
              }
              ><DeleteIcon  style={{color:'white'}}/></Delete> 
              </Container>}
              </>
  );

}
