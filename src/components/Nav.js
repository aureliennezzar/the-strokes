import React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Nav.css'
const Nav = () => {
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
                    className="nav__link">
                    <h1>The Strokes</h1>
                </Link>

            </div>
            <div className="nav__links">
                <Link
                    activeClass="active"
                    to="section"
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
                    to="instagram"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    key="Instagram"
                    className="nav__link">
                    Instagram
                </Link>
                <Link
                    activeClass="active"
                    to="section"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    key="Newsletter"
                    className="nav__link">
                    Newsletter
                </Link>

            </div>
            <div className="nav__links-burger">
                <FontAwesomeIcon icon={faBars} />
            </div>

        </nav>
    );
}

export default Nav;