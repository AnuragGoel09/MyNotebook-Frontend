import React, { useState } from "react";
import NoteContext from './noteContext'

const NoteState=(props)=>{
    const notes=[
      {
        "_id": "65283743bbcab371ba322937",
        "notebook": "6528354cc478fb9ef6e46759",
        "title": "title1",
        "desc": "first note adding to the database",
        "date": "2023-10-12T18:13:23.818Z",
        "__v": 0
      }
    ];
    
    const [noteState,setNoteState]=useState(notes);
    
    return (
        <NoteContext.Provider value={{noteState,setNoteState}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;