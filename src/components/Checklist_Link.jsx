import React from 'react';
import styled from 'styled-components';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Container=styled.div`
    position: relative;
    width: 210px;
    height: 210px;
    box-sizing: border-box;
    padding: 10px;
    background-color: lightblue;
    &:hover{
        box-shadow: 0.5px 0.5px 4px #888888;
    }
`;

const Title=styled.div`
    font-size: 20px;
    height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 500;
    padding: 10px;
    word-wrap: break-word;
`;

const TextArea=styled.div`
    height: 130px;
    overflow: hidden; 
    gap: 5px;
`;

const Time=styled.div`
    position: absolute;
    left: 5px;
    bottom: 5px;
    opacity: 0.7;
    font-size: 12px;
`;

const Item=styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 5px;
`;

export default function Note_Link(props) {
    const checklist=props.checklist;
  return (
    <Container>
        <Title>{checklist.title}</Title>
        <TextArea>
            
                {
                    checklist.list.map((item)=>{
                        if(item.done){
                            return <Item>
                                <CheckBoxIcon/>
                                {item.value}
                                </Item>
                        }
                        else{
                            return  <Item>
                                <CheckBoxOutlineBlankIcon/>
                                {item.value}
                            </Item>
                        }
                    }
                    )
                }
           
        </TextArea>
        <Time>{checklist.date}</Time>
    </Container>
  );
}
