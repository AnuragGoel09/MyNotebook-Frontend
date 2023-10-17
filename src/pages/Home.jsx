import React,{useContext, useEffect} from 'react';
import styled from 'styled-components'
import Notebook_Link from '../components/Notebook_Link';
import AddIcon from '@mui/icons-material/Add';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NotebookContext from '../context/notebooks/notebookContext';
import LoginContext from '../context/login/loginContext';
import Cookies from 'js-cookie';


const Container=styled.div`
    width: 100vw;
    box-sizing: border-box;
    min-height: calc(100vh - 80px);
`;

const Head=styled.span`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
    font-size: 25px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const AddNotebook=styled.div`
    position: absolute;
    right: 40px;
    display: flex;
    align-items: center;
    font-size: 17px;
    padding: 5px;
    &:hover{
        background-color: rgba(0,0,0,0.05);
    };
    cursor: pointer;
`;

const Wrapper=styled.div`
    box-sizing: border-box;
    padding: 60px 50px;
    display: flex;
    gap: 120px;
    flex-wrap: wrap;
`;

const Links=styled(Link)`
    text-decoration: none;
`;
export default function Home() {
    const {loginState}=useContext(LoginContext);
    const {notebooks,addNotebook,editNotebook,deleteNotebook,getNotebooks}=useContext(NotebookContext);
    useEffect(()=>{
        if(loginState)
            getNotebooks();
    },[])
  return (
    <>{loginState===null && <Navigate to="/login"/>}
        <Navbar/>
        <Container>
            <Head>
                Notebooks
                <AddNotebook onClick={()=>{
                addNotebook();
                }}><AddIcon/> Notebook</AddNotebook>
            </Head>
            <Wrapper>
                {
                    notebooks.map((notebook)=>(
                        <Notebook_Link notebook={notebook}/>
                    ))
                }
            </Wrapper>
        </Container>
    </>
  );
}
