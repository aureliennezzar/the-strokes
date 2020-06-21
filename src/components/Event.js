import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import './styles/Event.css'
import { db } from '../services/firebase';

const Event = ({ event, index, newEvent }) => {
    const [state, setState] = useState({
        title: "Evènement ",
        salle: event.salle,
        ville: event.ville,
        time: event.time,
        lien: event.lien,
        type: event.type,
        disabled: true,
        editMode: false,
        confirm: false
    })
    const [styles, setStyles] = useState({
        eventStyle: {}
    })
    const { title, salle, ville, time, lien, type, disabled, editMode, confirm } = state
    const { eventStyle } = styles


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleDelete = (e) => {
        setState({
            ...state,
            confirm: true
        })
    }
    const handleAbortEdit = (e) => {
        setState({
            ...state,
            title: "Evènement ",
            disabled: true,
            editMode: false,
        })
        setStyles({
            ...styles,
            eventStyle: {}
        })
    }
    const handleModify = (e) => {
        setState({
            ...state,
            title: "Modification evènement ",
            disabled: false,
            editMode: true,
        })
        setStyles({
            ...styles,
            eventStyle: {
                boxShadow: "0 0 0 2px black"
            }
        })

    }
    const handleSaveEdit = () => {

        setState({
            ...state,
            title: "Evènement ",
            disabled: true,
            editMode: false
        })
        setStyles({
            ...styles,
            eventStyle: {}
        })
        db.collection('tour-dates').doc(event.id).set({
            salle,
            ville,
            time,
            lien,
            type
        })
    }
    return (
        <li style={eventStyle} className="event-ctnr">
            <div className="event-header">
                {confirm
                    ? "êtes-vous sur de vouloir faire ca ?".toUpperCase()
                    : `${title} ${index + 1}`.toUpperCase()
                }

                <div className="event-header__btnCtnr">
                    {confirm

                        ? <FontAwesomeIcon className="event-icons" icon={faCheck} onClick={() => {
                            db.collection("tour-dates").doc(event.id).delete()
                            setState({
                                ...state,
                                confirm: false
                            })
                        }} />
                        : editMode
                            ? null
                            : <FontAwesomeIcon className="event-icons" icon={faTrash} onClick={handleDelete} />}

                    {confirm
                        ? <FontAwesomeIcon className="event-icons" icon={faTimes} onClick={() =>
                            setState({
                                ...state,
                                confirm: false
                            })} />
                        : editMode
                            ? <>
                                <FontAwesomeIcon className="event-icons" icon={faCheck} onClick={handleSaveEdit} />
                                <FontAwesomeIcon className="event-icons" icon={faTimes} onClick={handleAbortEdit} />
                            </>
                            : <FontAwesomeIcon className="event-icons" icon={faPen} onClick={handleModify} />
                    }



                </div>
            </div>
            <div className="event-body">
                <input
                    disabled={disabled}
                    name="salle"
                    onChange={handleChange}
                    value={salle} ></input>

                <input
                    disabled={disabled}
                    name="ville"
                    onChange={handleChange}
                    value={ville} ></input>

                <input
                    disabled={disabled}
                    name="time"
                    onChange={handleChange}
                    type='date'
                    value={time} ></input>

                <select
                    disabled={disabled}
                    name="type"
                    onChange={handleChange}
                    defaultValue={type}>
                    <option value={0}>Type</option>
                    <option value={1}>Concert</option>
                    <option value={2}>Festival</option>
                </select>
                <input
                    disabled={disabled}
                    name="lien"
                    onChange={handleChange}
                    value={lien} ></input>

            </div>
        </li>);
}

export default Event;