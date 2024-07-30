import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToDoItem from "./ToDoItem";

function Login(){

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();

    const loggedIn = useSelector(state=>{
        return state.user.loggedIn;
    })

    const navigate = useNavigate();

    React.useEffect(()=>{
        console.log(loggedIn);
        if (loggedIn){
            navigate("/");
        }
    }, [loggedIn])

    return(

        <form className="register" onSubmit={async (e)=>{
            e.preventDefault() /* LOGIN COMPONENT */

            const response = await fetch("https://todo-list-api-ey6p.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: username, password: password})
            })

            if (response.ok){
                const { token } = await response.json();


                localStorage.setItem("token", token);

                const storageToken = localStorage.getItem("token");
                if (storageToken){
                    const response = await fetch("https://todo-list-api-ey6p.onrender.com/user-data", {
                        method: "GET",
                        headers:{
                            "Authorization": "Bearer " + storageToken,
                            "Content-Type": "application/json"
                        }
                    })

                    const data = await response.json();
                    const todoItemsToReturn = []
                    data.userObject.todoList.forEach(e=>{
                        todoItemsToReturn.push({name: e.name, id: e.id})
                    })
                    dispatch(login({todoList: todoItemsToReturn}))
                }

            }else{
                setError(true);
            }
        }}> 
            {error && <p id="error">Username or password incorrect.</p>}
            <h1>Login</h1>
            <input type="text" placeholder="Username..." name="username" onChange={(e)=>{
                setUsername(e.target.value);
            }} value={username}/>

            <input type="password" placeholder="Password..." name="password" onChange={(e)=>{
                setPassword(e.target.value);
            }} value={password}/>

            <button type="submit" class="btn btn-danger">Login</button>

        </form>
    )
}

export default Login;