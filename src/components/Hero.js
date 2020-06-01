import React from 'react';
import video1 from '../assets/video1.mp4'
import './Hero.css'

const Hero = () => {
    return (
        <section className='hero'>
            <video className="hero__video" autoPlay muted width="100%">

                <source src={video1}
                    type="video/mp4" />

                        Sorry, your browser doesn't support embedded videos.
            </video>
        </section>
    );
}

export default Hero;