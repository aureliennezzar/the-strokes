import React from 'react';
import strokesTitle from '../assets/the-strokes-title.svg'
import tvImage from '../assets/tv.png'
import dateSvg from '../assets/dateTheStrokes.svg'
import dateSvg2 from '../assets/dateTheStrokes2.svg'
import './styles/Strokes.css'
import Fade from 'react-reveal/Fade';
const Strokes = () => {
    return (
        <section className="theStrokes">
            <div className="theStrokes__left">
                <img src={strokesTitle}></img>
                <div className="theStrokes__left-ctnr">
                    <Fade bottom>
                        <div className="theStrokes__left-TitleCtnr">
                            <img className="dateSvg1" src={dateSvg}></img>
                            <img className="dateSvg2" src={dateSvg2}></img>

                        </div>
                        <p className="theStrokes__description">
                            The Strokes est un groupe de rock américain, originaire de New York. Formé en 1998, il élève sa renommée dès le début des années 2000 comme l'un des groupes phares du renouveau garage rock et post-punk revival. Ils sont souvent désignés comme les héritiers du Velvet Underground et de Television, duquel le groupe s'inspire principalement.
                    </p>
                    </Fade>

                </div>
            </div>
            <div className="theStrokes__right">
                <img src={tvImage}></img>

            </div>
        </section>
    );
}

export default Strokes;