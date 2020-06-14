import React, { useState } from 'react';
import video1 from '../assets/video1.mp4'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, animateScroll as scroll } from "react-scroll";
import './styles/Hero.css'

const Hero = () => {
    const [state, setState] = useState({
        muteIcon: faVolumeMute,
        video: undefined
    })
    document.addEventListener("DOMContentLoaded", function () {
        const video = document.querySelector('.hero__video')
        video.volume = 0.1
        setState({
            ...state,
            video
        })
    });
    const handleClick = () => {
        const { video } = state
        video.muted = !video.muted;
        console.log(video.muted)
        setState({
            ...state,
            muteIcon: video.muted ? faVolumeMute : faVolumeUp,
        })
    }
    return (
        <section className='hero'>
            <video className="hero__video" loop infi="true" autoPlay muted playsInline width="100%">

                <source src={video1}
                    type="video/mp4" />

                        Erreur! votre navigateur ne supporte pas les videos incrustées.
            </video>
            <div className="hero__mute-button" onClick={handleClick}>
                <FontAwesomeIcon icon={state.muteIcon} />
            </div>
            <div className="hero__scroll-button">
                <Link
                    activeClass="active"
                    to="theStrokes"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    key="theStrokes"
                    className="nav__link">
                    <FontAwesomeIcon icon={faChevronDown} />
                </Link>
            </div>
        </section>
    );
}

export default Hero;