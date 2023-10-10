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

const TextArea=styled.div`
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
`;

const Time=styled.div`
    position: absolute;
    left: 5px;
    bottom: 5px;
    opacity: 0.5;
    font-size: 14px;
`;

export default function Note_Link() {
  return (
    <Container>
        <TextArea>
            CheckList
        </TextArea>
        <Time>Today</Time>
    </Container>
  );
}
