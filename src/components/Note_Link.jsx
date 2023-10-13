import React from 'react';
import styled from 'styled-components';

const Container=styled.div`
    position: relative;
    width: 210px;
    height: 210px;
    box-sizing: border-box;
    padding: 10px;
    background-color: #7ae47a;
    &:hover{
        box-shadow: 0.5px 0.5px 4px #888888;
    }
`;

const Title=styled.div`
    font-size: 20px;
    overflow: hidden;
    font-weight: 500;
    text-overflow: ellipsis;
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
    opacity: 0.7;
    font-size: 12px;
`;

export default function Note_Link(props){
    const note=props.note;
  return (
    <Container>
        <Title>{note.title}</Title>
        <TextArea>
            {note.desc}
        </TextArea>
        <Time>{note.date}</Time>
    </Container>
  );
}
