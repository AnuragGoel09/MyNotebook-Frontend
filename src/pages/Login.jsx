import React, { useContext, useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import LoginContext from '../context/login/loginContext';
import axios from 'axios';
import Loader from '../components/Loader'
import {apiURL} from '../config';
import {mobile} from '../responsive';
const Container=styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
`;
const Title=styled.div`
    position: absolute;
    width: 100%;
    left: 50px;
    top: 50px;
    text-align: left;
    justify-content: left;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: black;
    z-index: 99;
`;
const Img=styled.img`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`;
const Box=styled.div`
    font-size: 16px;
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    background-color: black;
    border-radius: 25px;
`;
const Head=styled.div`
    font-size: 22px;
    font-weight: bold;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    padding: 10px;
    color: white;
    margin-bottom: 25px;
`;
const Input=styled.input`
    width: 100%;
    border-radius: 20px;
    background-color: #E1F7F5;
    outline: none;
    border: none;
    padding: 1em;
    color:black;
    margin-bottom:2em;
    box-sizing: border-box;
    margin-bottom: 30px;
    transition: all 0.3s ease;
    font-size: 16px;
    &:hover{
        transform: scale(1.05);
    };
`;
const Submit=styled.button`
    width: 100%;
    cursor: pointer;
    border-radius: 20px;
    background-color: #E1F7F5;
    outline: none;
    border: none;
    padding: 1em;
    color:black;
    margin-bottom:2em;
    box-sizing: border-box;
    margin-bottom: 30px;
    transition: all 0.3s ease;
    font-size: 16px;
    &:hover{
        transform: scale(1.05);
    };
`;
const Create=styled.div`
    width: 100%;
`;
const Linkitem=styled(Link)`
    text-decoration: none;
    padding: 10px;
    color: white;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    &:hover{
        font-weight: bold;
    }
`;
const Error=styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: whitesmoke;
    font-size: 20px;
`;
export default function Login() {
    const {setLoginState}=useContext(LoginContext);
    const loginURL=`${apiURL}/api/auth/login`;
    const getuserURL=`${apiURL}/api/auth/getuser`;
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [authtoken,setAuthtoken]=useState(null);
    const [error,setError]=useState(null);
    const navigate = useNavigate();
    const [progress,updateProgress]=useState(false);
    useEffect(()=>{
        setLoginState(null);
        localStorage.removeItem('user')
    },[])
    
    const login=async(e)=>{
        // fetching the login credentials and validating it
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:  JSON.stringify({email:email,password:pass}),           
            };
            try {
                fetch(loginURL,requestOptions).then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Parse the response as JSON
                })
              .then((responseData) => {
                    setAuthtoken(responseData.authtoken);
                    if(responseData.error)
                    updateProgress(false);
                    setError(responseData.error)
            })
            .catch((error) => {
                updateProgress(false);
                setError("Internal Server Error");
            });   
            
        } catch (error) {
            updateProgress(false)
            console.log(error)
        }
    }
    useEffect(()=>{
        // to showcase the error for 2 sec in case of wrong credentials
        if(error){
            setInterval(()=>{
                setError(null);
            },2000)
        }
    },[error])
    useEffect(()=>{
        
        const getUser=async()=>{
            if(authtoken){
                    const headers={
                        'Content-Type': 'application/json',
                          'auth-token':authtoken
                    }
                    
                    try {
                        const response= await axios.post(getuserURL,{},{
                            headers:headers
                        });
                        if(response.data){
                            setLoginState({
                                authtoken:authtoken,
                                name:response.data.name,
                                email:response.data.email,
                                _id:response.data._id
                            });
                            localStorage.setItem('user',JSON.stringify({
                                authtoken:authtoken,
                                name:response.data.name,
                                email:response.data.email,
                                _id:response.data._id
                            }))
                            navigate("/")
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                
            }

            // fetching the user details from the authtoken
            getUser();
        },[authtoken,navigate,setLoginState,getuserURL])

        
  return (
      <>
        {progress && 
                <Loader/>}
        {!progress && <Container>
                    <Title>My Notebook</Title>
                    {/* <Img src="./static/background.jpg"/> */}
                    <Box>
                        {/* <Head>MY NOTEBOOK</Head> */}
                        <Head>Login</Head>
                            <Input type='email' required placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                            <Input type='password' required placeholder='Password'  onChange={(e)=>setPass(e.target.value)}/>
                            <Submit onClick={()=>{
                                updateProgress(true);
                                login();}}>Login</Submit>
                        <Create>
                            <Linkitem to="/signup">Create Account</Linkitem>
                        </Create>
                        <Error>{error}</Error>
                    </Box>
                    </Container>}
    </>
  );
}
