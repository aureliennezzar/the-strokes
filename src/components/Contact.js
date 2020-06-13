import React, { useState, useEffect } from 'react';
import './styles/Contact.css'
import Login from './Login';
import { auth } from 'firebase';
const Contact = () => {
    const [showOverlay, setOverlay] = useState(false)
    const [isAdmin, setRole] = useState(false)
    useEffect(() => {
        auth().onAuthStateChanged(function (user) {
            if (user) {
                setRole(true)
            } else {
                setRole(false)
            }
        });
    }, [])
    const handleClick = (e) => {
        if(isAdmin){
            auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
        } else{
            const overlay = document.querySelector('.contact__overlay')
            const connect = document.querySelector('.contact__connect')
    
            if (e.target == overlay || e.target == connect) {
                setOverlay(!showOverlay)
            }
        }
    }
    return (
        <section className="contact">
            <h1>Contact</h1>
            <div className="contact__links-ctnr">
                <ul className="contact__links">
                    {isAdmin
                        ? <li className="contact__connect" onClick={handleClick}>Se deconnecter</li>
                        : <li className="contact__connect" onClick={handleClick}>Admin</li>}

                </ul>
            </div>
            {showOverlay
                ? <div onClick={handleClick} className="contact__overlay">
                    <Login setOverlay={setOverlay} />
                </div>
                : null}
        </section>
    );
}

export default Contact;