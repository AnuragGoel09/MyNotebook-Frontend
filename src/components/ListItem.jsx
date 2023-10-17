import React, { useState } from 'react';
import styled from 'styled-components';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const Container=styled.div``;

const Item=styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 50px;
    margin: 2px;
`;

const TextArea=styled.textarea`
    width: 100%;
    resize: none;
    background-color: inherit;
    border: none;
    outline: none;
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    box-sizing: border-box;
`;

export default function ListItem(props) {

    const [data,setData]=useState(props.data);
    const idx=props.idx;
    return (
    <Container>
            {data.done && <Item>
                    <CheckBoxIcon/>
                    <TextArea>{data.value}</TextArea> 
                </Item>
            }
            {!data.done && <Item>
                    <CheckBoxOutlineBlankIcon/>
                    <TextArea>{data.value}</TextArea>
            </Item>

            }
        
    </Container>
  );
}
