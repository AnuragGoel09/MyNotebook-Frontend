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

const AddNotebook=styled(motion.div)`
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
    ${mobile({display:'none'})} 
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
    position: fixed;
    top: 25%;
    left: 0%;
    width: 60px;
    height: 50px;
    border-radius: 0px 30px 30px 0px;
    background-color: black;
    display: flex;
    justify-content: end;
    align-items: center;
    box-sizing: border-box;
    padding-right: 5px;
    display: none;
    color: white;
    ${mobile({display:'flex'})} 
    `;

export default function Home() {
    const {loginState}=useContext(LoginContext);
    const {notebooks,addNotebook,getNotebooks}=useContext(NotebookContext);
    const [isZoomed, setIsZoomed] = useState(false);
    const [progress,updateProgress]=useState(0);
    useEffect(()=>{
        if(loginState){
            updateProgress(50);
            getNotebooks();
            updateProgress(100);
        }
    },[loginState])
  return (
    <>{loginState===null && <Navigate to="/login"/>}
        <Navbar/>
        <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={()=>updateProgress(0)}
        />
       <Container>
            <Head>
                Notebooks
                <AddNotebook
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 1 }}
                    animate={{ scale: isZoomed ? 1.5 : 1 }}
                    transition={{ duration: 0.5 }}    
                    onClick={()=>{
                        setIsZoomed(true);
                        updateProgress(30);
                        setTimeout(()=>{
                            addNotebook();
                            setIsZoomed(false);
                            updateProgress(100);
                        },500);
                        
                    }}><AddIcon/> Notebook</AddNotebook>
            </Head>
            <Wrapper>
                <MobileAdd whileTap={{ scale: 0.9 }}
                    initial={{ scale: 1 }}
                    animate={{ scale: isZoomed ? 1.5 : 1 }}
                    transition={{ duration: 0.5 }}    
                    onClick={()=>{
                        setIsZoomed(true);
                        updateProgress(30);
                        setTimeout(()=>{
                            addNotebook();
                            setIsZoomed(false);
                            updateProgress(100);
                        },500);
                        
                    }}>
                    <AddIcon style={{fontSize:'40px'}}/>
                </MobileAdd>
                {  
                    notebooks.map((notebook)=>(
                        <NotebookLink key={notebook._id} notebook={notebook}/>
                    ))
                }
            </Wrapper>
        </Container>
    </>
  );
}
