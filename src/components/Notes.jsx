import React, { useState } from 'react';
import styled from 'styled-components';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
const Container=styled.div`
    width: 70vw;
    height: 90vh;
    background-color: lightblue;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title=styled.input`
    border: none;
    outline: none;
    width: 40%;
    text-align: center;
    background-color: inherit;
    box-sizing: border-box;
    padding: 10px;
    font-size: 25px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-bottom: 5px;
`;

const TextArea=styled.textarea`
    width: 100%;
    height: 100%;
    background-color: inherit;
    border: none;
    outline: none;
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    box-sizing: border-box;
    padding: 30px;
    line-height: 25px;
`;

const SaveButton=styled.div`
    position: absolute;
    right: 15px;
    top: 15px;
    padding: 3px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`;

export default function Notes(props) {
    const note=props.note;
    const [title,setTitle]=useState(note.title);
    const [desc,setDesc]=useState(note.desc);
    const changeTitle=(e)=>{
        setTitle(e.target.value);
    }
    const changeDesc=(e)=>{
        setDesc(e.target.value);
    }
  return (
    <Container>
        <Title value={title} onChange={changeTitle}/>
        <TextArea onChange={changeDesc} value={desc}>
        </TextArea>
        <SaveButton><DoneOutlinedIcon/></SaveButton>
    </Container>
  );
}
