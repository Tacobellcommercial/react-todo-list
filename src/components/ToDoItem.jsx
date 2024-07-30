import React from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../store/userSlice";


function ToDoItem(props){

    const dispatch = useDispatch();

    return(
        <div className="to-do-list-item">
            <h2>{props.name}</h2>
            <i class="fa-solid fa-trash" onClick={async (e)=>{
                const token = localStorage.getItem("token");
                if (token){
                    const response = await fetch("http://localhost:3001/delete-todo-item", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify({id: props.id})
                    })
                }

                dispatch(removeItem({id: props.id}));
            }}></i> 
        </div> 
    )
}

export default ToDoItem;