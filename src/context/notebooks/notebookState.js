import React, { useState } from "react";
import NotebookContext from './notebookContext'

const NotebookState=(props)=>{
    const notebooks=[
        {
          "_id": "6528354cc478fb9ef6e46759",
          "user": "6526948a2ac593132d47f17d",
          "title": "notebook1",
          "image": "image1",
          "date": "2023-10-12T18:05:00.848Z",
          "__v": 0
        }
      ];
    
    const [notebookState,setNotebookState]=useState(notebooks);
    
    return (
        <NotebookContext.Provider value={{notebookState,setNotebookState}}>
            {props.children}
        </NotebookContext.Provider>
    )
}
export default NotebookState;