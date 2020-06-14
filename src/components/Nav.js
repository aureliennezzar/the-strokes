import React, { useState } from 'react';
import { Link } from "react-scroll";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube, faTwitter } from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import strokesLogo from '../assets/the-strokes-logo.png'
import './styles/burger.css'
import './styles/Nav.css'
const cymbSound = new Audio("cymb.mp3")
cymbSound.volume = 0.5
const Nav = () => {
    const [count, setCount] = useState(0)
    const [burgerOn, setBurger] = useState(false)
    const [isBroke, setBroke] = useState(false)

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
    const iconsData = [
        { href: "https://www.youtube.fr", icon: faYoutube, title: "Youtube" },
        { href: "https://www.instagram.com/", icon: faInstagram, title: "Instagram" },
        { href: "https://twitter.com/home", icon: faTwitter, title: "Twitter" }]
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
                    <img src={strokesLogo}></img>
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

                    <li key='brandIcons' className="navMenuIcons">
                        {iconsData.map(data => {
                            const { href, title, icon } = data
                            return (
                                <a href={href} target="_blank" >
                                    <FontAwesomeIcon className="icon" icon={icon} title={title} />
                                </a>
                            )

                        })}

                    </li>
                </ul>
            </div>
        </nav >
    );
}

export default Nav;