import React, { useState } from 'react';
import "./styles/Login.css"
import { auth } from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress, Backdrop, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
const Login = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
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
        setOpen(true)
        auth().signInWithEmailAndPassword(state.email, state.password).then(() => {
            props.setOverlay(false)
            setOpen(false)
        }).catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, errorMessage);
            setOpen(false)

        })
    }
    return (
        <div className="login__panel">
            <h2>Connexion administrateur</h2>
            <form
                className="login__form"
                onSubmit={handleSubmit}
            >
                <label>Adresse e-mail</label>
                <input placeholder='Email' name="email" onChange={handleChange} type="text"></input>

                <label>Mot de passe</label>
                <input placeholder='Mot de passe' name="password" onChange={handleChange} type="password"></input>
                <button type="submit">Rock it!</button>
            </form>

            <div className="td__admin-panel-cross" onClick={() => {
                props.setOverlay(false)
            }} >
                <FontAwesomeIcon icon={faTimes} />
            </div>

            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default Login;