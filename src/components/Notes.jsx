import React from 'react';
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

export default function Notes() {
  return (
    <Container>
        <Title value="Untitled"/>
        <TextArea>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nam placeat. Voluptatem aliquam laudantium tempora, incidunt ratione magnam dicta nemo deleniti consequuntur tempore officiis! Eum reprehenderit ut incidunt aspernatur non.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni dolores atque odit pariatur ullam optio perferendis voluptas hic dolorum? At numquam eligendi qui sed magni nulla, eveniet incidunt veniam sequi!
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni dolores atque odit pariatur ullam optio perferendis voluptas hic dolorum? At numquam eligendi qui sed magni nulla, eveniet incidunt veniam sequi!
        </TextArea>
        <SaveButton><DoneOutlinedIcon/></SaveButton>
    </Container>
  );
}
