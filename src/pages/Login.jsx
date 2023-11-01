import React, { useContext, useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import LoginContext from '../context/login/loginContext';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import {apiURL} from '../config';
const Container=styled.div`
    width: 100vw;
    height: 100vh;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
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
    background-color: white;
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    border-radius: 20px;
    gap: 20px;
`;
const Head=styled.div`
    font-size: 22px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
`;
const Input=styled.input`
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    padding: 5px;
    border-bottom: 1px solid grey;
    font-size: 20px;
`;
const Submit=styled.button`
    width: 100%;
    padding: 15px;
    font-size: 20px;
    border-radius: 10px;
    border: 1px solid darkblue;
    cursor: pointer;
    background-color: lightblue;
    &:hover{
        background-color: cyan;
    }

`;
const Create=styled.div`
    width: 100%;
`;
const Linkitem=styled(Link)`
    text-decoration: none;
    &:hover{
        color: red;
    }
`;
const Error=styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: red;
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
    const [progress,updateProgress]=useState(0);
    useEffect(()=>{
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
                    setError(responseData.error)
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                setError("Internal Server Error");
            });   
            
        } catch (error) {
            console.log(error)
        }
        if(authtoken)
            updateProgress(60);
        else
            updateProgress(100);
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
                            updateProgress(100);
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
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Container>
                    <Img src="./static/background.jpg"/>
                    <Box>
                        <Head>Login</Head>
                            <Input type='email' required placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                            <Input type='password' required placeholder='Password'  onChange={(e)=>setPass(e.target.value)}/>
                            <Submit onClick={()=>{
                                updateProgress(30);
                                login();}}>Login</Submit>
                        <Create>
                            <Linkitem to="/signup">Create Account</Linkitem>
                        </Create>
                        <Error>{error}</Error>
                    </Box>
                    </Container>
    </>
  );
}
