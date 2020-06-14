import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { db } from '../services/firebase';
import Event from './Event';
import './styles/AdminPanelTd.css'
const AdminPanelTd = (props) => {
    const { handleClick } = props
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState(false)
    const [btnCtnrStyle, setBtnCtnrStyle] = useState({})
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
        const elmnt = document.querySelector('.datelist-ctnr');
        elmnt.scrollTop = 0
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
                    <div className="addCtnr" onClick={handleAdd}>
                        <div className="plus-circle">
                            <span className="plus-bar1 plus-bars"></span>
                            <span className="plus-bar2 plus-bars"></span>
                        </div>
                        <p style={{ margin: "0", marginTop: "3px" }}>Ajouter un évènement</p>
                    </div>
                </div>

                <div className="datelist-ctnr" style={{
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
                                    <div style={btnCtnrStyle} className="event-header__btnCtnr">
                                        <FontAwesomeIcon className="event-icons" icon={faCheck} onClick={handleConfirm} />
                                        <FontAwesomeIcon className="event-icons" icon={faTimes} onClick={handleAbort} />
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
                            <Event event={event} index={i} newEvent={newEvent} />
                        ))}
                    </ul>
                </div>
                <div className="td__admin-panel-cross" onClick={handleClick} >
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
        </div>
    );
}

export default AdminPanelTd;