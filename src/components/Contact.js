import React, { useState, useEffect } from 'react';
import './styles/Contact.css'
import Login from './Login';
import { auth } from 'firebase';
import { faFacebook, faYoutube, faInstagram, faTwitter } from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Snackbar, makeStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { db } from '../services/firebase';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import crowdImage from '../assets/crowd-at-concert.jpg'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
const Contact = () => {

    const classes = useStyles();

    const [open, setOpen] = useState([false, "", "success"]);
    const [showOverlay, setOverlay] = useState(false)
    const [isAdmin, setRole] = useState(false)
    const [mail, setMail] = useState('')
    const [playOpen, setPlayOpen] = useState(false)
    const handleChange = (e) => {
        setMail(e.target.value)
    }
    const handleSubmit = () => {
        setOpen([true, "Vous êtes maintenant abonné à la newsletter !", "success"]);

        db.collection("tempoSendEmail").add({ email: mail })
        setMail("")
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen([false, ""]);
    };
    const iconsData = [
        { href: "https://www.instagram.com/studentproject_thestrokes/", icon: faInstagram, title: "Instagram" },
        { href: "https://www.facebook.com/thestrokes/", icon: faFacebook, title: "Facebook" },
        { href: "https://twitter.com/thestrokes", icon: faTwitter, title: "Twitter" },
        { href: "https://www.youtube.com/user/thestrokes", icon: faYoutube, title: "YouTube" },]
    useEffect(() => {
        auth().onAuthStateChanged(function (user) {
            if (user) {
                setRole(true)
                setOpen([true, "Vous êtes connecté en tant qu'administrateur", "success"]);
                setMail("")
            } else {
                setRole(false)
            }
        });
    }, [])
    const handleLeaveConcours = () => {
        setPlayOpen(false)
        document.body.style.overflow = "auto";
    }
    const handleClick = (e) => {
        if (isAdmin) {
            auth().signOut().then(function () {
                setOpen([true, "Déconnexion reussi !", "success"]);
                // Sign-out successful.
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                setOpen([true, `Erreur: ( ${errorCode} )  ${errorMessage}`, "error"])
                // An error happened.
            });
        } else {
            const overlay = document.querySelector('.contact__overlay')
            const connect = document.querySelector('.contact__connect')

            if (e.target === overlay || e.target === connect) {
                setOverlay(!showOverlay)
            }
        }
    }
    const concoursDiv = <div className="concoursBackdrop">
        <img className="crowdImage" src={crowdImage} alt="Foule de concert"></img>
        <div className="concoursContainer rules">
            <h1>JEU CONCOURS</h1>
            <h3 id="concoursRules">Jeu valable jusqu’au <strong>6 juillet à 00:00</strong>.<br />
Pour participez, trouver l’easter egg dissimulé sur notre site.<br /> L’easter egg vous renverra vers un formulaire vous invitant à inscrire votre e-mail, ce qui enregistrera automatiquement votre participation pour le <strong>tirage au sort</strong>.</h3>
            <button style={{ padding: "15px 30px", border: "none", background: "#000", color: '#fff' }} onClick={handleLeaveConcours}>Let's GO !</button>
            <div className="td__admin-panel-cross" onClick={handleLeaveConcours} >
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
    </div>


    return (
        <section className="contact">
            <div className="contact__header">
                <div className="contact__brands">
                    {iconsData.map((data, i) => {
                        const { href, title, icon } = data
                        return (
                            <a style={{ display: "flex", flexDirection: "column", textDecoration: "none", alignItems: "center" }} key={i} href={href} target="_blank" rel="noopener noreferrer" >
                                <FontAwesomeIcon className="contact-icon" icon={icon} />
                                <label style={{ textAlign: "center", color: "#fff", cursor: "default" }}>{title}</label>
                            </a>
                        )
                    })}
                </div>
            </div>
            <div className="newsletter">
                <label htmlFor="email">Recevoir la newsletter</label><br />
                <div className="newsletter__input">
                    <input type="email" name="email" placeholder="Adresse mail" value={mail} onChange={handleChange}></input>
                    <button onClick={handleSubmit}>S'inscrire</button>
                </div>
                <p style={{ textAlign: "center", width: "70%" }}>En renseignant votre adresse email, vous acceptez de recevoir les dernières actualités de
<strong> The Strokes</strong> par courrier électronique et vous prenez connaissance de notre <span style={{ textDecoration: "underline", cursor: "pointer" }}>Politique de confidentialité.</span></p>
            </div>
            <div className="contact__links-ctnr">
                <ul className="contact__links">
                    <li id="concoursBtn" style={{}} onClick={() => {
                        document.body.style.overflow = "hidden";
                        setPlayOpen(true)
                    }
                    }>Jeu Concours</li>
                    <li>Nous Contacter</li>
                    <li>Mentions Legales</li>
                    {isAdmin
                        ? <li className="contact__connect" onClick={handleClick}>Se deconnecter</li>
                        : <li className="contact__connect" onClick={handleClick}>Administration</li>}
                </ul>
                <p>Site réalisé pour un projet étudiant par <a href="https://aurelien-nezzar.com" target="_blank" rel="noopener noreferrer">Aurélien Nezzar</a>, <a href="https://www.linkedin.com/in/nicolassellier/" target="_blank" rel="noopener noreferrer">Nicolas Sellier</a> et <a href="https://emmajan.fr/" target="_blank" rel="noopener noreferrer">Emma Jan</a>. Tout droit réservé. </p>
            </div>
            {showOverlay
                ? <div onClick={handleClick} className="contact__overlay">
                    <Login setOverlay={setOverlay} setSnack={setOpen} />
                </div>
                : null}

            <Snackbar open={open[0]} autoHideDuration={1850} onClose={handleClose}>
                <Alert onClose={handleClose} severity={open[2]}>
                    {open[1]}
                </Alert>
            </Snackbar>
            {playOpen
                ? concoursDiv
                : null}
        </section>
    );
}

export default Contact;