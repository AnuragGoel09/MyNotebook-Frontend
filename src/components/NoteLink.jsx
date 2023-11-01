import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';

const Container=styled.div`
    position: relative;
    width: 210px;
    height: 210px;
    box-sizing: border-box;
    padding: 10px;
    color: ${props => props.fcolor};
    background-color: ${props => props.bgcolor};
    &:hover{
        box-shadow: 0.5px 0.5px 4px #888888;
    }
    border-radius: 20px;
`;

const Title=styled.div`
    font-size: 20px;
    height: 20px;
    overflow: hidden;
    font-weight: 500;
    padding: 10px;
`;

const TextArea=styled.div`
    overflow: hidden; 
    white-space: wrap;
    height: 130px;
    text-overflow: ellipsis;
`;

const Time=styled.div`
    position: absolute;
    left: 5px;
    bottom: 5px;
    opacity: 0.8;
    font-size: 12px;
    padding: 5px;
`;

export default function Note_Link(props){
    const note=props.note;
  return (
    <Container  bgcolor={note.bgcolor} fcolor={note.fontcolor}>
        <Title>{note.title}</Title>
        <TextArea>
            {note.desc}
        </TextArea>
        <Time>{(new Date(note.date)).toISOString().split('T')[0]}</Time>
    </Container>
  );
}
