import React from 'react';
import strokesTitle from '../assets/the-strokes-title.svg'
import dateSvg from '../assets/dateTheStrokes.svg'
import dateSvg2 from '../assets/dateTheStrokes2.svg'
import './styles/Strokes.css'
import mockup from '../assets/mockup.mp4'
const Strokes = () => {
    const strongStyle = {
        fontWeight: "700",
        whiteSpace: "nowrap",
    }
    return (
        <section className="theStrokes">
            <div className="theStrokes__left">
                <img class="strokesTitle" src={strokesTitle} alt="The Strokes titre"></img>
                <div className="theStrokes__left-ctnr">
                        <div className="theStrokes__left-TitleCtnr">
                            <img className="dateSvg1" src={dateSvg} alt="1998 - 2020"></img>
                            <img className="dateSvg2" src={dateSvg2} alt="1998 - 2020"></img>

                        </div>
                        <h2>L’année de retour du groupe<br />
rock post-punk revival.</h2>
                        <p className="theStrokes__description">
                            Formé en 1998 à New York, <strong>The Strokes</strong> marque “le coup” (comme leur nom de groupe) dès le début des années 2000.<br /><br /><strong>Julian Casablancas</strong>, chanteur et principal auteur des chansons, est accompagné de ses deux guitaristes <strong>Nick Valensi</strong> et <strong>Albert Hammond Jr.</strong>, son batteur <strong>Fabrizio Moretti</strong> et son bassiste <strong>Nikolai Fraiture.</strong> En 2020, ils font leur retour avec <strong>“The New Abnormal”</strong>.
                    </p>

                </div>
                
                <video className="mockup-video" loop infi="true" autoPlay muted playsInline width="100%">

                    <source src={mockup}
                        type="video/mp4" />

                     Erreur! votre navigateur ne supporte pas les videos incrustées.
                </video>
            </div>
        </section>
    );
}

export default Strokes;