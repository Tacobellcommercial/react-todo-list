import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/userSlice";

function AddToDo(){

    const dispatch = useDispatch();

    const [name, setName] = React.useState("");

    const loggedIn = useSelector(state=>{
        return state.user.loggedIn;
    })

    return(
        <form class="add-to-do" onSubmit={async (e)=>{
            e.preventDefault();
            const id = Math.random();

            if (name != ""){
                if (loggedIn){
                    const token = localStorage.getItem("token");
                    const response = await fetch("https://todo-list-api-ey6p.onrender.com/add-todo-item", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify({name: name, id: id})
                    })

                }

                dispatch(addItem({name: name, id: id})) /*{"name": name} = payload, payload.name*/
                setName("");
            }else{
                console.log("Must not be empty...");
            }
        }}>
            <h2>Add To-Do Item</h2>
            <input type="text" placeholder="(Ex: Pick up meds)" onChange={(e)=>{
                setName(e.target.value);
            }} value={name}/>
            <button type="submit" class="btn btn-danger">Add Item</button>
        </form>
    )
}

export default AddToDo;