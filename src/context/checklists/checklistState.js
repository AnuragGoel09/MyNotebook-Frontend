import React, { useState } from "react";
import ChecklistContext from './checklistContext'
import { useContext } from "react";
import LoginContext from "../login/loginContext";
import {apiURL} from '../../config';
const ChecklistState=(props)=>{
  const listInitial = []
  const [lists, setLists] = useState(listInitial)
  const {loginState}=useContext(LoginContext);
  // Get all Lists
  const getLists = async (id) => {
    // API Call 
    const response = await fetch(`${apiURL}/api/lists/fetchalllist/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });
    const json = await response.json();
    // setShow(true);
    setLists(json)
  }

  // Add a Note
  const addList = async (id) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${apiURL}/api/lists/addlist/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });

    const list = await response.json();
    setLists(lists.concat(list))
  }

  // Delete a Note
  const deleteList = async (id) => {
    // API Call
    const response = await fetch(`${apiURL}/api/lists/deletelist/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });
    const json = response.json(); 
    const newLists = lists.filter((list) => { return list._id !== id })
    setLists(newLists)
  }

  // Edit a Note
  const editList = async (id, title, list,bgcolor,fontcolor) => {
    // API Call 
    try {
      
      const response = await fetch(`${apiURL}/api/lists/updatelist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": loginState.authtoken  
        },
        body: JSON.stringify({title,list,bgcolor,fontcolor})
      });
      const json = await response.json(); 
      if(json.error){
        return;
      }
      let newLists = JSON.parse(JSON.stringify(lists))
      // Logic to edit in client
      for (let index = 0; index < newLists.length; index++) {
        const element = newLists[index];
        if (element._id === id) {
          newLists[index].title = title;
          newLists[index].list = list;
          newLists[index].bgcolor = bgcolor;
          newLists[index].fontcolor = fontcolor;
          break; 
        }
      }  
      setLists(newLists);
      return true;
    } catch (error) {
      return false; 
      console.log("error");
    }
    }

    return (
        <ChecklistContext.Provider value={{lists,addList,deleteList,editList,getLists}}>
            {props.children}
        </ChecklistContext.Provider>
    )
}
export default ChecklistState;