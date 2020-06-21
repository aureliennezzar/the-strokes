import React from 'react';
import './styles/Loader.css'

document.addEventListener("DOMContentLoaded", function () {
    const wave = document.querySelector('.wave')
    const deepWater = document.querySelector('.deep-water')
    const randomColor = Math.random() < 0.5 ? true : false;
    if (randomColor) {
        wave.classList.add('blue')
        deepWater.style.background = "#01AC93 "
    } else {
        wave.classList.add('orange')
        deepWater.style.background = "#FFC045"
    }
    setTimeout(() => {
        document.body.classList.add("loaded")
        setTimeout(() => {
            document.body.style.overflow = "auto"
        }, 1500)
    }, 2250)

})
const Loader = () => {
    return (
        <div id="loader-wrapper">
            <div className="wave-fill">
                <div className="water">
                    <span className="wave"></span>
                    <span className="deep-water"></span>
                </div>
            </div>
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
        </div>
    );
}

export default Loader;