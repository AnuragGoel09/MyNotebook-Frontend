import React, { useContext, useState } from "react";
import NoteContext from './noteContext'
import LoginContext from "../login/loginContext";

const NoteState=(props)=>{
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const {loginState,setLoginState}=useContext(LoginContext);
  // Get all Notes
  const getNotes = async (id) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });
    const json = await response.json() 
    console.log(json);
    setNotes(json)
  }

  // Add a Note
  const addNote = async (id) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote/${id}`, {
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
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": loginState.authtoken
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, desc) => {
    // API Call 
    try {
      
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": loginState.authtoken  
        },
        body: JSON.stringify({title, desc})
      });
      const json = await response.json(); 
      if(json.error){
        return;
      }
      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].desc = desc;
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