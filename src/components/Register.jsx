import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Register(){

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

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [success, setSuccess ] = React.useState(false);
    const [error, setError] = React.useState(false);

    return(
        <form className="register" onSubmit={async (e)=>{
            e.preventDefault();
            const response = await fetch("https://todo-list-api-ey6p.onrender.com/add-todo-item", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            })

            const data = await response.text();
            if (data == "User created"){
                setSuccess(true);
                setError(false);
            }else if (data == "User already created"){
                setError(true);
                setSuccess(false);
            }

        }}>
            {success && <p id="success">Account created! Try logging in.</p>}
            {error && <p id="error">Error occured, account not created...</p>}
            <h1>Register</h1>
            <input type="text" placeholder="Username..." name="username" onChange={(e)=>{
                setUsername(e.target.value);
            }} value={username}/>
            <input type="password" placeholder="Password..." name="password" onChange={(e)=>{
                setPassword(e.target.value);
            }} value={password}/>
            <button type="submit" class="btn btn-danger">Make account</button>

        </form>
    )
}

export default Register;