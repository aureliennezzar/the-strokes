import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import Event from './Event';
const AdminPanelTd = (props) => {
    const { handleClick } = props
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState(false)
    const [state, setState] = useState({
        salle: "",
        ville: "",
        time: "",
        lien: "",
        type: 0,
    })

    useEffect(() => {
        return db.collection('tour-dates').onSnapshot((snapshot) => {
            const eventsData = []
            snapshot.forEach(doc => eventsData.push(({ ...doc.data(), id: doc.id })))
            setEvents(eventsData)
        })
    }, [])
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleAdd = () => {
        setNewEvent(true)
    }
    const handleAbort = () => {
        setNewEvent(false)
    }
    const handleConfirm = () => {
        const { salle, time, ville, type, lien } = state
        db.collection("tour-dates").add({
            salle,
            ville,
            time,
            type,
            lien,
        })
        setState({
            salle: "",
            ville: "",
            time: "",
            lien: "",
            type: 0,
        })
        setNewEvent(false)
    }

    return (
        <div className="tourDates__admin-panel" onClick={handleClick}>
            <div className="td__admin-panel-ctnr">

                <div className="adminpanel__header">
                    <h1 className="adminpanel__title">Modifier tournée</h1>
                    <button onClick={handleAdd}>Ajouter un évènement</button>
                </div>

                <div style={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto"
                }}>
                    <ul className="td__admin-panel-datesList">
                        {newEvent
                            ?
                            <li className="event-ctnr">
                                <div className="event-header">
                                    {"Nouvel évènement".toUpperCase()}
                                    <div className="event-header__btnCtnr">
                                        <button onClick={handleConfirm}>Confirmer</button>
                                        <button onClick={handleAbort}>Annuler</button>
                                    </div>
                                </div>
                                <div className="event-body">
                                    <input placeholder="Salle" name="salle" onChange={handleChange} value={state.salle}></input>
                                    <input placeholder="Ville" name="ville" onChange={handleChange} value={state.ville}></input>
                                    <input placeholder="Date" name="time" type="date" onChange={handleChange} value={state.time}></input>

                                    <select name="type" value={state.type} onChange={handleChange}>
                                        <option value="0">Type</option>
                                        <option value="1">Concert</option>
                                        <option value="2">Festival</option>
                                    </select>
                                    <input placeholder="Lien boutique" name="lien" onChange={handleChange} value={state.lien}></input>
                                    
                                </div>
                            </li>
                            : null}

                        {events.map((event, i) => (
                                <Event event={event} index={i} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminPanelTd;