import React, { useEffect, useState } from 'react';
import './TourDates.css'
import { db } from '../services/firebase';
import { auth } from 'firebase';
const TourDates = () => {
    const [isAdmin, setRole] = useState(false)
    const [dates, setDates] = useState([]);
    const [showOverlay, setOverlay] = useState(false)

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
        const tourDatesRef = db.collection("tour-dates")
        tourDatesRef.onSnapshot((querySnapshot) => {
            let newDates = []
            querySnapshot.forEach((doc) => {
                const { lieu, date } = doc.data()
                newDates.push({
                    lieu,
                    date
                })
                console.log(doc.id, "=>", doc.data());
            })
            setDates(newDates)
        })

    }, [])

    return (
        <section className="tourDates">
            <h1>Dates de tournées</h1>
            {isAdmin
                ? < a className="tourDates__modify" onClick={handleClick}>Modifier</a>
                : null}
            <div className="tourDates__dates-ctnr">
                <ul className="tourDates__dates-list">
                    {dates.map(date => {
                        return (
                            <li key={date.date.seconds}>
                                <span className="tourDates__loc">{date.lieu[0]},</span> <span className="tourDates__loc2">{date.lieu[1]}</span><br />
                                <span className="tourDates__date">{date.date.seconds}</span><br />
                                lien
                            </li>
                        )
                    })}
                </ul>
            </div>

            {
                showOverlay
                    ? <div className="tourDates__admin-panel" onClick={handleClick}>
                        <div className="td__admin-panel-ctnr">
                            <ul className="td__admin-panel-datesList">
                                <li>
                                    <input type="text" value="AccorHotel Arena"></input>
                                    <input type="text" value="Paris"></input>
                                    <input type="text" value="date"></input><br />
                                    <input type="text" value="www.google.com"></input>
                                </li>
                                <li>
                                    <input type="text" value="AccorHotel Arena"></input>
                                    <input type="text" value="Paris"></input>
                                    <input type="text" value="date"></input><br />
                                    <input type="text" value="www.google.com"></input>
                                </li>
                                <li>
                                    <input type="text" value="AccorHotel Arena"></input>
                                    <input type="text" value="Paris"></input>
                                    <input type="text" value="date"></input><br />
                                    <input type="text" value="www.google.com"></input>
                                </li>
                                <li>
                                    <input type="text" value="AccorHotel Arena"></input>
                                    <input type="text" value="Paris"></input>
                                    <input type="text" value="date"></input><br />
                                    <input type="text" value="www.google.com"></input>
                                </li>
                            </ul>
                        </div>
                    </div>
                    : null
            }

        </section >
    );
}

export default TourDates;