import React ,{useState}from 'react';
import styled from 'styled-components';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AddIcon from '@mui/icons-material/Add';
import CheckBox from '@mui/icons-material/CheckBox';
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

const List=styled.div`
    width: 100%;
    height: 100%;
    background-color: inherit;
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    box-sizing: border-box;
    padding: 30px;
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
    background-color: red;
    padding: 20px;
`;

export default function Notes(props) {
    const checklist=props.checklist;
    const [title,setTitle]=useState(checklist.title);
    // const [desc,setDesc]=useState(note.desc);
    const changeTitle=(e)=>{
        setTitle(e.target.value);
    }
    // const changeDesc=(e)=>{
    //     setDesc(e.target.value);
    // }
  return (
    <Container>
        <Title value={title} onChange={changeTitle}/>
        <List>
            {
                checklist.list.map((item,idx)=>{
                    <Item key={item}>
                        <CheckBox/>{item.value}
                    </Item>
                })
            }
        </List>
        <AddItem><AddIcon/></AddItem>
        <SaveButton><DoneOutlinedIcon/></SaveButton>
    </Container>
  );
}
