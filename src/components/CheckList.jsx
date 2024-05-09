import React ,{useContext, useState,useEffect}from 'react';
import styled from 'styled-components';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import ChecklistContext from '../context/checklists/checklistContext';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import BrushIcon from '@mui/icons-material/Brush';
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
    width: 80%;
    text-align: center;
    background-color: inherit;
    color: ${props => props.fcolor};
    box-sizing: border-box;
    padding: 10px;
    font-size: 25px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-bottom: 5px;
`;

const Lined=styled.div`
    width: 100%;
    height: 5px;
    background-color: black;
`;
const List=styled.div`
    width: 100%;
    height: 100%;
    background-color: inherit;
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    box-sizing: border-box;
    padding: 30px;
    overflow: hidden;
    overflow-y: scroll;
    line-height: 25px;
`;

const AddItem=styled.div`
    position: absolute;
    right: 60px;
    top: 15px;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`;

const SaveButton=styled.div`
    position: absolute;
    right: 15px;
    top: 15px;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`;

const Item=styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: start;
    gap: 50px;
    margin: 2px;
`;

const TextArea=styled.textarea`
    width: 100%;
    background-color: inherit;
    border: none;
    outline: none;
    resize: none;
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const Line=styled.div`
    width: 100%;
    height: 2px;
    background-color: black;
`;

const ChooseColor=styled.div`
    position: absolute;
    right: 100px;
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
    ${mobile({flexDirection:'column'})};
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
    const checklist=props.checklist;
    const [title,setTitle]=useState(checklist.title);
    const [list,setList]=useState(checklist.list);
    const {editList}=useContext(ChecklistContext);
    const [show,setShow]=useState(false);
    const [colorPallet,setColorPallet]=useState(false);
    const [bgcolor,setBgcolor]=useColor(checklist.bgcolor);
    const [fcolor,setFcolor]=useColor(checklist.fontcolor);
    const [currbgcolor,setcurrBgcolor]=useState(checklist.bgcolor);
    const [currfcolor,setcurrFcolor]=useState(checklist.fontcolor);
    const changeTitle=(e)=>{
        setTitle(e.target.value);
    }
    const addListItem=()=>{
        let newList=list;
        newList=newList.concat({done:false,value:"new item"});
        setList(newList);
        
    };
    const autoAdjustTextarea = (element) => {
        if (element) {
          element.style.height = 'auto';
          element.style.height = element.scrollHeight + 'px';
        }
      };
      useEffect(()=>{
        setcurrBgcolor(bgcolor.hex);
        setcurrFcolor(fcolor.hex);
    },[bgcolor,fcolor])
  return (
    <Container bgcolor={currbgcolor}>
        <Title value={title} onChange={changeTitle} fcolor={currfcolor}/>
        <Lined/>
        <List>
            {    
                list.map((item,index)=>(
                <>
                    <Item key={index}>
                        <Checkbox style={{color:currfcolor}}
                            defaultChecked={item.done}
                            onChange={()=>{list[index].done=!list[index].done;console.log(list)}}
                            />
                        <TextArea style={{color:currfcolor}} onChange={(e)=>{
                            list[index].value=e.target.value;
                        }}
                        onFocusCapture={(e) => autoAdjustTextarea(e.target)}
                        onInput={(e) => autoAdjustTextarea(e.target)}
                        defaultValue={item.value}></TextArea>    
                    </Item>
                    <Line  style={{backgroundColor:currfcolor}}/>
                </>  
                ))
            }
        </List>
        <AddItem onClick={addListItem}><AddIcon/></AddItem>
        <SaveButton onClick={()=>{
            editList(checklist._id,title,list,currbgcolor,currfcolor);
            setShow(true);
            setTimeout(() => {
                    setShow(false);
            }, 2000);
        }}>{!show && <DoneOutlinedIcon/>}
        {show && "Saved"}</SaveButton>
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
    </Container>
  );
}
