import React from 'react';
import styled from 'styled-components';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

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
`;

const Name=styled.div`
  font-size: 18px;
  color: rgba(0,0,0,0.8);
  font-weight: 400;
`;

export default function Notebook_Link(props) {
  return (
    <Container>
      <Img src='./notebook-cover/pattern1.jpg'/>
      <Edit><EditNoteOutlinedIcon/></Edit>
      <Name>{props.title}</Name>
    </Container>
  );
}
