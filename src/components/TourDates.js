import React, { useEffect, useState } from 'react';
import './TourDates.css'
import { db } from '../services/firebase';
import { auth } from 'firebase';
import AdminPanelTd from './AdminPanelTd';
const TourDates = () => {
    const [isAdmin, setRole] = useState(false)
    const [events, setEvents] = useState([]);
    const [showOverlay, setOverlay] = useState(true)
    const tourDatesRef = db.collection("tour-dates")

    const handleClick = (e) => {
        const overlay = document.querySelector('.tourDates__admin-panel')
        const modify = document.querySelector('.tourDates__modify')
        if (e.target == overlay || e.target == modify) {
            setOverlay(!showOverlay)
        }
    }
    useEffect(() => {
        auth().onAuthStateChanged(function (user) {
            if (user) {
                setRole(true)
            } else {
                setRole(false)
            }
        });
        return tourDatesRef.onSnapshot((snapshot) => {
            const eventsData = []
            snapshot.forEach(doc => eventsData.push(({ ...doc.data(), id: doc.id })))
            setEvents(eventsData)
        })
    }, [])



    return (
        <section className="tourDates">
            <h1 className="tourDates__title">Dates de tournées</h1>
            {isAdmin
                ? < a className="tourDates__modify" onClick={handleClick}>Modifier</a>
                : null}
            <div className="tourDates__dates-ctnr">
                <ul className="tourDates__dates-list">
                    {events.map(event => {
                        return (
                            <li key={event.id}>
                                <span className="tourDates__loc">{event.salle},</span> <span className="tourDates__loc2">{event.ville}</span><br />
                                <span className="tourDates__date">{event.date}</span><br />
                                lien
                            </li>
                        )
                    })}
                </ul>
            </div>

            {
                showOverlay
                    ? <AdminPanelTd handleClick={handleClick} />
                    : null
            }

        </section >
    );
}

export default TourDates;