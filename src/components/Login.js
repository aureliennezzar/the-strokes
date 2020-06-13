import React, { useState } from 'react';
import "./styles/Login.css"
import { auth } from 'firebase';
const Login = (props) => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        auth().signInWithEmailAndPassword(state.email, state.password).then(()=>{
            props.setOverlay(false)
        }).catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);

        })
    }
    return (
        <div className="login__panel">
            <h1>Se connecter</h1>
            <form
                className="login__form"
                onSubmit={handleSubmit}
            >
                <input placeholder='Email' name="email" onChange={handleChange} type="text"></input>
                <input placeholder='Mot de passe' name="password" onChange={handleChange} type="password"></input>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;