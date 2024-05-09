import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import BrushIcon from '@mui/icons-material/Brush';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { mobile } from '../responsive';
const Container=styled.div`
    width: 60vw;
    height: 90vh;
    background-color: ${props => props.bgcolor};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    ${mobile({width:'100%',height:'70vh'})}
`;

const Title=styled.input`
    border: none;
    outline: none;
    width: 40%;
    text-align: center;
    background-color: inherit;
    box-sizing: border-box;
    padding: 10px;
    color: ${props => props.fcolor};
    font-size: 25px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-bottom: 5px;
`;

const Line=styled.div`
    width: 100%;
    height: 5px;
    background-color: black;
`;

const TextArea=styled.textarea`
    width: 100%;
    height: 100%;
    background-color: inherit;
    border: none;
    resize: none;
    outline: none;
    font-size: 16px;
    color: ${props => props.fcolor};
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    box-sizing: border-box;
    padding: 30px;
    line-height: 25px;
`;

const SaveButton=styled.div`
    position: absolute;
    right: 15px;
    top: 15px;
    padding: 5px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover{
        background-color: rgba(0,0,0,0.1);
        transform: scale(1.1);
    }
`;

const ChooseColor=styled.div`
    position: absolute;
    right: 80px;
    top: 15px;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 10px;
`;

const Color=styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 5px;
    border-radius: 30%;
    transition: all 0.2s ease;
    &:hover{
        background-color: rgba(0,0,0,0.1);
        transform: scale(1.1);
    }
`;

const Box=styled.div`
    display: flex;
    gap: 20px;
    ${mobile({flexDirection:'column',overflow:'scroll'})}
`;

const Head=styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    font-size: 20px;
    color: white;
`;

const PageColor=styled.div`
    padding: 5px;
    background-color: black;
    border-radius: 20px;
`;

const FontColor=styled.div`
    padding: 5px;
    background-color: black;
    border-radius: 20px;
`;

export default function Notes(props) {
    const note=props.note;
    const [title,setTitle]=useState(note.title);
    const [desc,setDesc]=useState(note.desc);
    const {editNote}=useContext(NoteContext);
    const [show,setShow]=useState(false);
    const [colorPallet,setColorPallet]=useState(false);
    const [bgcolor,setBgcolor]=useColor(note.bgcolor);
    const [fcolor,setFcolor]=useColor(note.fontcolor);
    const [currbgcolor,setcurrBgcolor]=useState(note.bgcolor);
    const [currfcolor,setcurrFcolor]=useState(note.fontcolor);
   
    const changeTitle=(e)=>{
        setTitle(e.target.value);
    }
    const changeDesc=(e)=>{
        setDesc(e.target.value);
    }
    useEffect(()=>{
        setcurrBgcolor(bgcolor.hex);
        setcurrFcolor(fcolor.hex);
    },[bgcolor,fcolor])
  return (
    <>
    <Container bgcolor={currbgcolor}>
        <Title value={title} onChange={changeTitle} fcolor={currfcolor}/>
        <Line></Line>
        <TextArea fcolor={currfcolor} onChange={changeDesc} value={desc}>
        </TextArea>
        <ChooseColor>
            <Color onClick={()=>setColorPallet(!colorPallet)}><BrushIcon/></Color>
            {colorPallet && 
                <Box>
                <PageColor>
                    <Head>Page Color</Head>
                    <ColorPicker hideInput={["hex", "hsv",]} color={bgcolor} onChange={setBgcolor}/>
                </PageColor>
                <FontColor>
                    <Head>Font Color</Head>
                    <ColorPicker hideInput={["hex", "hsv",]} color={fcolor} onChange={setFcolor}/>
                </FontColor>
                </Box>
            }
        </ChooseColor>
        
        <SaveButton onClick={()=>{
            editNote(note._id,title,desc,currbgcolor,currfcolor);
            setShow(true);
            setTimeout(() => {
                    setShow(false);
            }, 2000);
        }}>
        {!show && <DoneOutlinedIcon/>}
        {show && "Saved"}
        </SaveButton>
        
    </Container>
    </>
  );
}
