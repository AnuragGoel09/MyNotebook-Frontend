import React, { useContext, useState } from "react";
import NoteContext from './noteContext'
import LoginContext from "../login/loginContext";
import {apiURL} from '../../config';
const NoteState=(props)=>{
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const {loginState}=useContext(LoginContext);
  // Get all Notes
  const getNotes = async (id) => {
    // API Call 
    const response = await fetch(`${apiURL}/api/notes/fetchallnotes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });
    const json = await response.json();
    setNotes(json)
  }

  // Add a Note
  const addNote = async (id) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${apiURL}/api/notes/addnote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    let json;
    const response = await fetch(`${apiURL}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });
    json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, desc,bgcolor,fontcolor) => {
    // API Call 
    try {
      const response = await fetch(`${apiURL}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": loginState.authtoken  
        },
        body: JSON.stringify({title, desc,bgcolor,fontcolor})
      });
      const json = await response.json(); 
      console.log("hello");
      if(json.error){
        console.log(json.error);
        return;
      }
      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].desc = desc;
          newNotes[index].bgcolor = bgcolor;
          newNotes[index].fontcolor = fontcolor;
          break; 
        }
      }  
      setNotes(newNotes);
      return true;
    } catch (error) {
      return false; 
      console.log("error");
    }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;