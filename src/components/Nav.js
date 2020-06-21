import React, { useState } from 'react';
import { Link } from "react-scroll";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube, faTwitter, faFacebook } from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import strokesLogoBlack from '../assets/the-strokes-logo-black.svg'
import strokesLogoWhite from '../assets/the-strokes-logo-white.png'
import crowdImage from '../assets/crowd-at-concert.jpg'
import guitarImg from '../assets/GuitareStrokes.png'
import MuiAlert from '@material-ui/lab/Alert';
import './styles/burger.css'
import './styles/concours.css'
import './styles/Nav.css'
import { makeStyles, Snackbar } from '@material-ui/core';


const cymbSound = new Audio("cymb.mp3")
const crowdSound = new Audio("crowd.mp3")
cymbSound.volume = 0.5
crowdSound.volume = 0.1

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
const Nav = ({ scrolled }) => {

    const classes = useStyles();
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [burgerOn, setBurger] = useState(false)
    const [state, setState] = useState({
        email: "",
        phone: "",
        lname: "",
        fname: ""
    })
    const [openGL, setOpenGL] = useState(false)

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleClick = (e) => {
        setOpen(false)
        document.body.style.overflow = "auto";
    }

    const handleSubmit = () => {
        setOpenGL(true)
        setOpen(false)
        document.body.style.overflow = "auto";
    }
    window.addEventListener("resize", () => {

        // Get width and height of the window excluding scrollbars
        var w = document.documentElement.clientWidth;
        if (w > 930) {
            setBurger(false)
        }

    });
    const playSound = () => {
        if (count === 10) {
            cymbSound.play()
            crowdSound.play()
            setOpen(true)
            setCount(count + 1)
            document.body.style.overflow = "hidden";
        } else if (count < 10) {
            const audio = document.createElement("audio")
            if (count % 2) {
                audio.src = "hat.mp3"
            } else {
                audio.src = "hit.mp3"
            }
            audio.volume = 0.3
            audio.play()
            setCount(count + 1)
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenGL(false);
    };
    const handleBurger = (e) => {
        setBurger(!burgerOn)
    }
    const linksData = [
        { scroll: "hero", name: "Accueil" },
        { scroll: "theStrokes", name: "The Strokes" },
        { scroll: "album", name: "Album" },
        { scroll: "tourDates", name: "Tournée" },
        { scroll: "newsPanel", name: "Blog" },
        { scroll: "contact", name: "Contact" }]
    const iconsData = [
        { href: "https://www.instagram.com/studentproject_thestrokes/", icon: faInstagram, title: "Instagram" },
        { href: "https://www.facebook.com/thestrokes/", icon: faFacebook, title: "Facebook" },
        { href: "https://twitter.com/thestrokes", icon: faTwitter, title: "Twitter" },
        { href: "https://www.youtube.com/user/thestrokes", icon: faYoutube, title: "YouTube" },]

    const concoursDiv = <div className="concoursBackdrop">
        <img className="crowdImage" src={crowdImage} alt="Foule de concert"></img>
        <div className="concoursContainer">
            <img className="guitarImg" src={guitarImg} alt="Guitare dédicacée"></img>
            <h1>félicitations !</h1>
            <h3>Pour participer au tirage au sort,<br /> veuillez remplir les champs ci-dessous :</h3>
            <form
                className="concours__form"
                onSubmit={handleSubmit}
            >
                <label>Email</label>
                <input placeholder='Email' name="email" onChange={handleChange}></input>
                <label>Numero de téléphone</label>
                <input placeholder='Numero de téléphone' name="phone" onChange={handleChange}></input>
                <label>Nom</label>
                <input placeholder='Nom' name="lname" onChange={handleChange}></input>
                <label>Prénom</label>
                <input placeholder='Prénom' name="fname" onChange={handleChange}></input>
                <button type="submit">Envoyer</button>
            </form>

            <div className="td__admin-panel-cross" onClick={handleClick} >
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
    </div>

    return (
        <nav className='nav'>
            <div className="nav__brand">
                <img alt="Logo des Strokes" onClick={playSound} src={scrolled ? strokesLogoBlack : strokesLogoWhite}></img>
            </div>
            <div className="nav__links">
                {linksData.map(link => (
                    <Link
                        activeClass="active"
                        to={link.scroll}
                        spy={true}
                        smooth={true}
                        offset={-60}
                        duration={500}
                        key={link.name}
                        className="nav__link">
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className="nav__links-icons">
                {iconsData.map((data, i) => {
                    const { href, title, icon } = data
                    return (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer" >
                            <FontAwesomeIcon className="icon" icon={icon} title={title} />
                        </a>
                    )

                })}

            </div>
            <div className={"nav__links-burger " + (burgerOn ? "change" : null)} onClick={handleBurger}>
                <div className="bar1 burgerBars"></div>
                <div className="bar2 burgerBars"></div>
                <div className="bar3 burgerBars"></div>
                {/* <span className={"dotLeft dot " + (burgerOn ? "makeDot" : null)}></span>
                <span className={"dotRight dot " + (burgerOn ? "makeDot" : null)}></span> */}
            </div>
            <div id="menuToggle">
                <ul id="menu" className={burgerOn ? "changeMenu" : "hideMenu"}>
                    {linksData.map(link => (
                        <Link
                            activeClass="active"
                            to={link.scroll}
                            spy={true}
                            smooth={true}
                            offset={-60}
                            duration={500}
                            key={link.name}
                            className="nav__link menuLinks"
                            onClick={() => {
                                setBurger(false)
                            }}>
                            <li key={link.name}>
                                {link.name}
                            </li>
                        </Link>
                    ))}

                    <li key='brandIcons' className="nav__BrandIconsCtnr" >
                        <li className="navMenuIcons">
                            {iconsData.map((data, i) => {
                                const { href, title, icon } = data
                                return (
                                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" >
                                        <FontAwesomeIcon className="icon" icon={icon} title={title} />
                                    </a>
                                )

                            })}
                        </li>
                    </li>
                </ul>
            </div>

            {open ? concoursDiv : null}

            <Snackbar open={openGL} autoHideDuration={4500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={"success"}>
                    Bonne chance {state.fname} !
                </Alert>
            </Snackbar>
        </nav >
    );
}

export default Nav;