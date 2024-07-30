import React from "react";
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice";
import ToDoItem from "../components/ToDoItem";


function Navbar(){

    const isLoggedIn = useSelector(state=>{
        return state.user.loggedIn;
    })

    const dispatch = useDispatch();

    React.useEffect(()=>{
        async function fetchData(){

            const token = localStorage.getItem("token");

            if (token){
                const response = await fetch("https://todo-list-api-ey6p.onrender.com/user-data", {
                    method: "GET",
                    headers:{
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                })

                if (response.ok){
                    const data = await response.json();
                    console.log("User data: ", data);
                    const todoItemsToReturn = []
                    data.userObject.todoList.forEach(e=>{
                        todoItemsToReturn.push({name:e.name, id:e.id})
                    })
                    dispatch(login({todoList: todoItemsToReturn}))
                }else{
                    const errorText = await response.text();
                    localStorage.removeItem("token");
                    dispatch(logout());
                }
            }else{
                dispatch(logout());
            }
        }

        fetchData();
    }, [])

    return (
        <>        
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" id="header-link">React To-Do</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>        

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isLoggedIn?
                        <ul className="navbar-nav">
                            <Link to="/">Home</Link>
                            <button onClick={(e)=>{
                                localStorage.removeItem("token");
                                dispatch(logout());
                            }} class="btn btn-outline-secondary">Logout</button>
                        </ul>
                    :
                        <ul className="navbar-nav">
                            <li className="nav-item"> <Link to="/register">Register</Link></li>
                            <li className="nav-item"> <Link to="/login">Login</Link></li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
        <Outlet/>
    </>
    )
}

export default Navbar;


