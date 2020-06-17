import React, { useState } from 'react';
import { Link } from "react-scroll";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube, faTwitter } from "@fortawesome/fontawesome-free-brands";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import strokesLogoBlack from '../assets/the-strokes-logo-black.svg'
import strokesLogoWhite from '../assets/the-strokes-logo-white.svg'
import crowdImage from '../assets/crowd-at-concert.jpg'
import './styles/burger.css'
import './styles/concours.css'
import './styles/Nav.css'


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
}));
const cymbSound = new Audio("cymb.mp3")
const crowdSound = new Audio("crowd.mp3")
cymbSound.volume = 0.5
crowdSound.volume = 0.15
const Nav = ({ scrolled }) => {
    const classes = useStyles();
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [burgerOn, setBurger] = useState(false)
    const [isBroke, setBroke] = useState(false)
    const [state, setState] = useState({
        email: "",
        phone: "",
        lname: "",
        fname: ""
    })
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
        alert('Bonne chance !')
        setOpen(false)
        document.body.style.overflow = "auto";
    }
    window.addEventListener("resize", () => {

        // Get width and height of the window excluding scrollbars
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        if (w > 930) {
            setBurger(false)
        }

    });
    const playSound = () => {

        const audio = document.createElement("audio")
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
        { href: "https://www.youtube.com/user/thestrokes", icon: faYoutube, title: "Youtube" },
        { href: "https://www.instagram.com/studentproject_thestrokes/", icon: faInstagram, title: "Instagram" },
        { href: "https://twitter.com/thestrokes", icon: faTwitter, title: "Twitter" }]

    const concoursDiv = <div className="concoursBackdrop">
        <img className="crowdImage" src={crowdImage}></img>
        <div className="concoursContainer">
            <h1>Bravo ! Tentez votre chance pour gagner une guitare dédicacée</h1>
            <form
                className="concours__form"
                onSubmit={handleSubmit}
            >
                <input placeholder='Email' name="email" onChange={handleChange}></input>
                <input placeholder='Numero de téléphone' name="phone" onChange={handleChange}></input>
                <input placeholder='Nom' name="lname" onChange={handleChange}></input>
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
                <Link
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    key="Home"
                    className="nav__link"
                    onClick={playSound}>
                    <img src={scrolled ? strokesLogoBlack : strokesLogoWhite}></img>
                </Link>

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
                {iconsData.map(data => {
                    const { href, title, icon } = data
                    return (
                        <a href={href} target="_blank" >
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

                    <li key='brandIcons' style={{width: "100%", display: "flex", alignItems:"center", justifyContent: "center"}}>
                        <div className="navMenuIcons">
                            {iconsData.map(data => {
                                const { href, title, icon } = data
                                return (
                                    <a href={href} target="_blank" >
                                        <FontAwesomeIcon className="icon" icon={icon} title={title} />
                                    </a>
                                )

                            })}
                        </div>
                    </li>
                </ul>
            </div>

            {open ? concoursDiv : null}
        </nav >
    );
}

export default Nav;