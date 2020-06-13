import React, { useState } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube, faTwitter } from "@fortawesome/fontawesome-free-brands";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/Nav.css'
const cymbSound = new Audio("cymb.mp3")
cymbSound.volume = 0.5
const Nav = () => {
    const [count, setCount] = useState(0)
    const [isBroke, setBroke] = useState(false)
    const [brandTitle, setTitle] = useState("The Strokes")
    const playSound = () => {

        const audio = document.createElement("audio")
        if (count === 10) {
            cymbSound.play()
            setTitle('Bien joué !')
            setCount(count + 1)
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
    return (
        <nav className='nav'>
            <div className="nav__brand">
                <Link
                    activeClass="active"
                    to="hero__video"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    key="Home"
                    className="nav__link"
                    onClick={playSound}>
                    <h1>{brandTitle}</h1>
                </Link>

            </div>
            <div className="nav__links">
                <Link
                    activeClass="active"
                    to="hero"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    key="Acceuil"
                    className="nav__link">
                    Accueil
                </Link>
                <Link
                    activeClass="active"
                    to="theStrokes"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    key="Strokes"
                    className="nav__link">
                    The Strokes
                </Link>
                <Link
                    activeClass="active"
                    to="album"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    key="Album"
                    className="nav__link">
                    Album
                </Link>
                <Link
                    activeClass="active"
                    to="tourDates"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    key="tourDates"
                    className="nav__link">
                    Tournée
                </Link>
                <Link
                    activeClass="active"
                    to="newsPanel"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    key="newsPanel"
                    className="nav__link">
                    Blog
                </Link>
                <Link
                    activeClass="active"
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    key="Contact"
                    className="nav__link">
                    Contact
                </Link>

            </div>
            <div className="nav__links-icons">
                <FontAwesomeIcon className="icon" icon={faYoutube} title="Youtube" />
                <FontAwesomeIcon className="icon" icon={faInstagram} title="Instagram" />
                <FontAwesomeIcon className="icon" icon={faTwitter} title="Twitter" />
            </div>
            <div className="nav__links-burger">
                <FontAwesomeIcon icon={faBars} />
            </div>

        </nav>
    );
}

export default Nav;