import React, { useState } from 'react';
import { Link } from "react-scroll";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube, faTwitter, faFacebook } from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import strokesLogoBlack from '../assets/the-strokes-logo-black.svg'
import strokesLogoWhite from '../assets/the-strokes-logo-white.png'
import crowdImage from '../assets/crowd-at-concert.jpg'
import './styles/burger.css'
import './styles/concours.css'
import './styles/Nav.css'


const cymbSound = new Audio("cymb.mp3")
const crowdSound = new Audio("crowd.mp3")
cymbSound.volume = 0.5
crowdSound.volume = 0.15
const Nav = ({ scrolled }) => {
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [burgerOn, setBurger] = useState(false)
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
        { href: "https://www.facebook.com/thestrokes/", icon: faFacebook, title: "Facebook" },
        { href: "https://www.youtube.com/user/thestrokes", icon: faYoutube, title: "Youtube" },
        { href: "https://www.instagram.com/studentproject_thestrokes/", icon: faInstagram, title: "Instagram" },
        { href: "https://twitter.com/thestrokes", icon: faTwitter, title: "Twitter" }]

    const concoursDiv = <div className="concoursBackdrop">
        <img className="crowdImage" src={crowdImage} alt="Foule de concert"></img>
        <div className="concoursContainer">
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
                <li className="nav__link concoursLink">Jeu Concours</li>
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
                    <li className="nav__link concoursLink">Concours</li>
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
                        <div className="navMenuIcons">
                            {iconsData.map((data, i) => {
                                const { href, title, icon } = data
                                return (
                                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" >
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