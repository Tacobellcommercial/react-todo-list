import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddToDo from "./AddToDo";
import ToDoItem from "./ToDoItem";

function Home(){

    const isLoggedIn = useSelector(state=>{
        return state.user.loggedIn;
    })

    const dispatch = useDispatch();

    const toDoItems = useSelector(state=>{
        return state.user.todoListItems;
    })


    function ReturnItems(){
        const returnItems = [];
        toDoItems.forEach(e=>{
            returnItems.push(<ToDoItem name={e.name} id={e.id} key={e.id}/>);
        })

        return returnItems;
    }

    return(
        <div className="home">
            <h1>React To-Do</h1>
            <AddToDo/>
            <ReturnItems/>
            {!isLoggedIn && <p>Make an account to save your list!</p>}
        </div>
    )
}

export default Home;

