import React, { useState } from "react";
import ChecklistContext from './checklistContext'

const ChecklistState=(props)=>{
    const checklists=[
      {
        "_id": "652837ac2998abda69bb887e",
        "notebook": "6528354cc478fb9ef6e46759",
        "title": "List1",
        "list": [
          {
            "done": false,
            "value": "Item 1"
          },
          {
            "done": false,
            "value": "Item 2"
          },
          {
            "done": true,
            "value": "Item 2"
          },
          {
            "done": false,
            "value": "Item 1"
          },
          {
            "done": false,
            "value": "Item 2"
          },
          {
            "done": true,
            "value": "Item 2"
          },
          {
            "done": false,
            "value": "Item 1"
          },
          {
            "done": false,
            "value": "Item 2"
          },
          {
            "done": true,
            "value": "Item 2"
          }
        ],
        "date": "2023-10-12T18:15:08.399Z",
        "__v": 0
      }
    ];
    
    const [checklistState,setChecklistState]=useState(checklists);
    
    return (
        <ChecklistContext.Provider value={{checklistState,setChecklistState}}>
            {props.children}
        </ChecklistContext.Provider>
    )
}
export default ChecklistState;