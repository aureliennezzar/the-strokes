import React from 'react';
import InstaCarousel from './components/InstaCarousel';
import "./App.css"
import Nav from './components/Nav';
import Section from './components/Section';
import Hero from './components/Hero';

function App() {

  document.addEventListener("DOMContentLoaded", function () {

    let active = false;
    const nav = document.querySelector('.nav')
    const navBrand = document.querySelector('.nav__brand')
    console.log(navBrand)
    window.addEventListener('scroll', () => {
      if (active && window.scrollY < 130) {
        active = !active
        nav.style.background = "#ffffff00"
        nav.style.color = "#fff"
        navBrand.style.fontSize = "25px"
      }
      if (active === false && window.scrollY >= 130) {
        active = true
        nav.style.background = "#fff"
        nav.style.color = "#000"
        navBrand.style.fontSize = "15px"


      }
    });
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    let checkExist = setInterval(function () {
      let app = document.getElementById('eapps-instagram-feed-1');
      if (app) {
        app.removeChild(app.lastElementChild);
        clearInterval(checkExist);
      }
    }, 100); // check every 100ms


  });

  return (
    <div className="App">
      <Nav />
      <Hero />
      <Section />
      <InstaCarousel />
    </div>
  );
}

export default App;
