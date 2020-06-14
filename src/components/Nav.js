import React, { useState } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube, faTwitter } from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/burger.css'
import './styles/Nav.css'
const cymbSound = new Audio("cymb.mp3")
cymbSound.volume = 0.5
const Nav = () => {
    const [count, setCount] = useState(0)
    const [burgerOn, setBurger] = useState(false)
    const [isBroke, setBroke] = useState(false)
    const [brandTitle, setTitle] = useState("The Strokes")

    window.addEventListener("resize", () => {

        // Get width and height of the window excluding scrollbars
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        console.log(w, h);
        if (w > 930) {
            setBurger(false)
        }

    });
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
                <FontAwesomeIcon className="icon" icon={faYoutube} title="Youtube" />
                <FontAwesomeIcon className="icon" icon={faInstagram} title="Instagram" />
                <FontAwesomeIcon className="icon" icon={faTwitter} title="Twitter" />
            </div>
            <div className={"nav__links-burger " + (burgerOn ? "change" : null)} onClick={handleBurger}>
                <div className="bar1 burgerBars"></div>
                <div className="bar2 burgerBars"></div>
                <div className="bar3 burgerBars"></div>
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
                </ul>
            </div>
        </nav>
    );
}

export default Nav;