import React from 'react';
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.jpg'
import image4 from '../assets/image4.jpg'
import image5 from '../assets/image5.jpg'
import image6 from '../assets/image6.jpg'
import image7 from '../assets/image7.jpg'
import "./styles/InstaCarousel.css"
const instaCarousel = () => {
    return (
        <div className="elfsight-app-b52e90c9-042f-4893-8089-e78340cbb23c instagram">

        </div>

        // <section className="carousel">
        //     <button className="carousel__btn carousel__btn--left">
        //         {"<"}
        //     </button>
        //     <div className="carousel__TrackCtnr">
        //         <ul className="carousel__track">
        //             {[image1, image2, image3, image4, image5, image6, image7].map(img => {
        //                 return (
        //                     <li className="carousel__slide">
        //                         <img className="carousel__image" src={img} alt=""></img>
        //                     </li>
        //                 )
        //             })}
        //         </ul>
        //     </div>
        //     <button className="carousel__btn carousel__btn--right">
        //         {">"}

        //     </button>
        // </section>
    );
}

export default instaCarousel;