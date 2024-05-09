import React,{useContext, useEffect, useState} from 'react';
import styled from 'styled-components'
import NotebookLink from '../components/NotebookLink';
import AddIcon from '@mui/icons-material/Add';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NotebookContext from '../context/notebooks/notebookContext';
import LoginContext from '../context/login/loginContext';
import {motion} from 'framer-motion';
import LoadingBar from 'react-top-loading-bar'
import {mobile} from '../responsive';
import Loader from '../components/Loader';
import BounceLoader from "react-spinners/BounceLoader";

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
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;   
    font-size: 25px;
`;

const AddNotebook=styled.div`
    position: absolute;
    right: 40px;
    display: flex;
    align-items: center;
    font-size: 17px;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
    ${mobile({display:'none'})}; 
    transition: all 0.2s ease;
    &:hover{
        transform: scale(1.1);
    }
`;

const Wrapper=styled.div`
    box-sizing: border-box;
    position: relative;
    padding: 60px 50px;
    display: flex;
    gap: 120px;
    flex-wrap: wrap;
    ${mobile({justifyContent:'center'})} 
`;

const MobileAdd=styled(motion.div)`
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    font-size: 17px;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer; 
    transition: all 0.2s ease;
    &:hover{
        transform: scale(1.1);
    }
    display: none;
    ${mobile({display:'flex'})};
    `;

export default function Home() {
    const {loginState}=useContext(LoginContext);
    const {notebooks,addNotebook,getNotebooks}=useContext(NotebookContext);
    const [isZoomed, setIsZoomed] = useState(false);
    const [progress,updateProgress]=useState(true);
    const [addProgress,setAddProgress]=useState(false);
    useEffect(()=>{
        if(loginState){
            getNotebooks();
            updateProgress(false)
        }
    },[loginState])
    useEffect(()=>{
        setAddProgress(false)
    },[notebooks])
  return (
    <>{loginState===null && <Navigate to="/login"/>}
        {progress && <Loader/>}
        {!progress &&
    <>
    <Navbar/>
       <Container>
            <Head>
                My Notebooks
                <MobileAdd onClick={()=>{
                    addNotebook();
                    setAddProgress(true);
                }}>{addProgress==false?<><AddIcon/></>:<BounceLoader size="30" color="black"/>}</MobileAdd>
                <AddNotebook onClick={()=>{
                    addNotebook();
                    setAddProgress(true);
                }}>{addProgress==false?<><AddIcon/>Notebook</>:<BounceLoader size="30" color="black"/>}</AddNotebook>
            </Head>
            <Wrapper>
                {  
                    notebooks.map((notebook)=>(
                        <NotebookLink key={notebook._id} notebook={notebook}/>
                    ))
                }
            </Wrapper>
        </Container>
        </>
        }
    </>
  );
}
