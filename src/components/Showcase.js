import React from 'react';
import showcaseImage from '../assets/showcase.png'
import './styles/Showcase.css'
import Fade from 'react-reveal/Fade';
const Showcase = () => {

    return (
        <section className="showcase">
            <Fade bottom>
                <img src={showcaseImage} alt="CD et vinyle"></img>
                <button>pre-commandez en exclusivité</button>

            </Fade>
        </section>
    );
}

export default Showcase;