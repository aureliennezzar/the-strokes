import React from 'react';
import showcaseImage from '../assets/showcase.jpg'
import './styles/Showcase.css'
const Showcase = () => {
    const lienBoutique = "https://www.emp-online.fr/p/the-new-abnormal/466188.html?gclid=Cj0KCQjwirz3BRD_ARIsAImf7LMmLlJeyRGQT9a6PtP1_UiAH1G-phmTer_2QYszoNfU_3uJGFqh_JQaAhaMEALw_wcB"
    return (
        <section className="showcase">
            <img className="cover" src={showcaseImage} alt="CD et vinyle"></img>
            <div className="description">
                <h1>”The New Abnormal” </h1>
                <h2>est le sixième album studio des Strokes.</h2>
                <p>L’album est disponible depuis le <strong>3 juillet 2020</strong> via Cult et RCA Records.<br />
            Il s’agit de leur premier album depuis sept ans après “Comedown Machine” sorti en 2013.<br />
  L’album a été produit par <strong>Rick Rubin</strong> et enregistré dans son studio Shangri-La à Malibu, en Californie.</p>

                <a href={lienBoutique} target="_blank">commander</a>
            </div>

        </section>
    );
}

export default Showcase;