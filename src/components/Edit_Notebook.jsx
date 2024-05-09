import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import NotebookContext from '../context/notebooks/notebookContext';
import { mobile ,tablet} from '../responsive';
const Container=styled.div`
    width: 60vw;
    height: 70vh;
    background-color:black;
    color: white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    ${tablet({width:'90vw',padding:'30px',justifyContent:'center',overflow:'scroll'})};

`;

const Head=styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    padding: 20px;
`;

const Box=styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    ${mobile({flexDirection:'column'})} 
`;

const Notebook=styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Notebook_Img=styled.div`
    width: 250px;
    height: 320px;
    ${tablet({width:'100px',height:'125px'})} 
    /* width: 60%;
    height: 100%; */
`;

const Notebook_Title=styled.div`
    margin: 10px;
    font-size: 20px;
    ${tablet({fontSize:'16px'})} 
`;

const Details=styled.div`
    flex: 1;
    width: 60%;
    ${mobile({width:'100%'})} 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Text1=styled.div`
    width: 100%;
    text-align: left;
    margin: 5px 0px;
    font-size: 20px;
`;

const Title=styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 20px;
    border: none;
    outline: none;
    border-radius: 16px;
`;

const Text2=styled.div`
    width: 100%;
    text-align: left;
    margin: 20px 0px 5px 0px;
    font-size: 20px;
`;

const Options=styled.div`
display: flex;
margin: 5px;
${mobile({justifyContent:'center'})} 
flex-wrap: wrap;
gap: 30px;
`;


const Option=styled.div`
    width: 80px;
    cursor: pointer;
    height: 100px;
    transition: all 0.2s ease;
    &:hover{
        scale: 1.1;
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
    ${mobile({marginTop:'30px'})}
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`;
const Img=styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0px 10px 10px 0px;
`;

export default function Edit_Notebook(props) {
    const notebook=props.notebook;
    const [title,setTitle]=useState(notebook.title);
    const [image,setImage]=useState(notebook.image);
    const [show,setShow]=useState(false);
    const {editNotebook}=useContext(NotebookContext);
  return (
    <Container>
        <Head>Personalize Your Notebook</Head>
        <Box>
            <Notebook>
                <Notebook_Img>
                    <img src={image} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'0px 20px 20px 0px'}}/>
                </Notebook_Img>
                <Notebook_Title>{title}</Notebook_Title>
            </Notebook>
            <Details>
                <Text1>Title:</Text1>
                <Title value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <Text2>Notebook Cover:</Text2>
                <Options>
                    <Option onClick={(e)=>setImage("./notebook-cover/pattern1.jpg")}>
                        <Img src="./notebook-cover/pattern1.jpg"/>
                    </Option>
                    <Option onClick={(e)=>setImage("./notebook-cover/pattern2.jpg")}>
                        <Img src="./notebook-cover/pattern2.jpg"/>
                    </Option>
                    <Option onClick={(e)=>setImage("./notebook-cover/pattern3.jpg")}>
                        <Img src="./notebook-cover/pattern3.jpg"/>
                    </Option>
                    <Option onClick={(e)=>setImage("./notebook-cover/pattern4.jpg")}>
                        <Img src="./notebook-cover/pattern4.jpg"/>
                    </Option>
                    <Option onClick={(e)=>setImage("./notebook-cover/pattern5.jpg")}>
                        <Img src="./notebook-cover/pattern5.jpg"/>
                    </Option>
                    <Option onClick={(e)=>setImage("./notebook-cover/pattern6.jpg")}>
                        <Img src="./notebook-cover/pattern6.jpg"/>
                    </Option>
                </Options>
            </Details>
        </Box>
        <SaveButton onClick={()=>{
            editNotebook(notebook._id,title,image);
            setShow(true);
            setTimeout(() => {
                    setShow(false);
            }, 2000);
        }}>
        {!show && <DoneOutlinedIcon/>}
        {show && "Saved"}
        </SaveButton>
    </Container>
  );
}
