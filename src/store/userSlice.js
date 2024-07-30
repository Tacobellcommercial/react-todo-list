import { createSlice } from "@reduxjs/toolkit";
import ToDoItem from "../components/ToDoItem";


const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        username: "",
        todoListItems: [{name: "Pick up food", id: 0.9289382382}] /*todo list of react components, info got by useeffect and mongodb databsae*/
    },
    reducers: {
        login(state, action){
            state.loggedIn = true;
            state.todoListItems = action.payload.todoList;
        },
        logout(state){
            state.loggedIn = false;
            state.todoListItems = [];
        },
        addItem(state, action){
            state.todoListItems.push({name: action.payload.name, id: action.payload.id});
        },
        removeItem(state, action){
            const itemsListToEqual = [];
            state.todoListItems.forEach(e=>{
                if (e.id != action.payload.id){
                    itemsListToEqual.push(e);
                }
            })

            state.todoListItems = itemsListToEqual
        }
    }
})  


export const { addItem, login, logout, removeItem } = userSlice.actions;
export default userSlice;