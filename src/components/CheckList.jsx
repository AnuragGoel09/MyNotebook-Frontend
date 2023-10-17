import React ,{useContext, useState}from 'react';
import styled from 'styled-components';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import ChecklistContext from '../context/checklists/checklistContext';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
    width: 80%;
    text-align: center;
    background-color: inherit;
    box-sizing: border-box;
    padding: 10px;
    font-size: 25px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-bottom: 5px;
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


export default function Notes(props) {
    const checklist=props.checklist;
    const [title,setTitle]=useState(checklist.title);
    const [list,setList]=useState(checklist.list);
    const {editList}=useContext(ChecklistContext);
    const [show,setShow]=useState(false);
    const changeTitle=(e)=>{
        setTitle(e.target.value);
    }
    const changeList=(e,index)=>{
        let newList=list;
        newList[index].value=e.target.value;
        setList(newList);
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
  return (
    <Container>
        <Title value={title} onChange={changeTitle}/>
        <List>
            {
                
                list.map((item,index)=>(
                <>
                    <Item>
                        <Checkbox
                            defaultChecked={item.done}
                            onChange={()=>{list[index].done=!list[index].done;console.log(list)}}
                            />
                        <TextArea onChange={(e)=>{
                            list[index].value=e.target.value;
                        }}
                        onFocusCapture={(e) => autoAdjustTextarea(e.target)}
                        onInput={(e) => autoAdjustTextarea(e.target)}
                        >{item.value}</TextArea>    
                    </Item>
                    <Line/>
                </>  
                ))
            }
        </List>
        <AddItem onClick={addListItem}><AddIcon/></AddItem>
        <SaveButton onClick={()=>{
            editList(checklist._id,title,list);
            setShow(true);
            setTimeout(() => {
                    setShow(false);
            }, 2000);
        }}>{!show && <DoneOutlinedIcon/>}
        {show && "Saved"}</SaveButton>
    </Container>
  );
}
