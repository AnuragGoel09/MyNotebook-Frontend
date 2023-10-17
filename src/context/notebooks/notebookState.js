import React, { useContext, useState } from "react";
import NotebookContext from './notebookContext'
import LoginContext from "../login/loginContext";

const NotebookState=(props)=>{
  const host = "http://localhost:5000"
  const notesbooks = []
  const [notebooks, setNotebooks] = useState(notesbooks)
  const {loginState,setLoginState}=useContext(LoginContext);
  // Get all Notebooks
  const getNotebooks = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notebooks/fetchallnotebooks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });
    const json = await response.json() 
    setNotebooks(json)
  }

  // Add a Notebook
  const addNotebook = async () => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notebooks/addnotebook`, {
      method: 'POST',
      headers: {
        "auth-token":loginState.authtoken
      }
    });

    const notebook = await response.json();
    setNotebooks(notebooks.concat(notebook))
  }

  // Delete a Note
  const deleteNotebook = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notebooks/deletenotebook/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });
    const json = response.json(); 
    const newNotebooks = notebooks.filter((notebook) => { return notebook._id !== id })
    setNotebooks(newNotebooks)
  }

  // Edit a Notebook
  const editNotebook = async (id, title,image) => {
    // API Call 
    const response = await fetch(`${host}/api/notebooks/updatenotebook/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      },
      body: JSON.stringify({title, image})
    });
    const json = await response.json(); 

     let newNotebooks = JSON.parse(JSON.stringify(notebooks))
    // Logic to edit in client
    for (let index = 0; index < newNotebooks.length; index++) {
      const element = newNotebooks[index];
      if (element._id === id) {
        newNotebooks[index].title = title;
        newNotebooks[index].image = image;
        break; 
      }
    }  
    setNotebooks(newNotebooks);
  }

    return (
        <NotebookContext.Provider value={{notebooks,addNotebook,editNotebook,deleteNotebook,getNotebooks}}>
            {props.children}
        </NotebookContext.Provider>
    )
}
export default NotebookState;