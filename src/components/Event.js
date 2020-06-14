import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import './styles/Event.css'
import { db } from '../services/firebase';

const Event = ({ event, index, newEvent }) => {
    const [title, setTitle] = useState(`Evènement ${index + 1}`)
    const [salle, setSalle] = useState(event.salle)
    const [ville, setVille] = useState(event.ville)
    const [time, setTime] = useState(event.time)
    const [lien, setLien] = useState(event.lien)
    const [type, setType] = useState(event.type)
    const [disabled, setDisabled] = useState(true)
    const [eventStyle, setEventStyle] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [btnCtnrStyle, setBtnCtnrStyle] = useState({})
    const handleDelete = (e) => {
        setConfirm(true)
    }
    const handleAbortEdit = (e) => {
        setDisabled(true)
        setEventStyle({})
        setTitle(`Evènement ${index + 1}`)
        setEditMode(false)
        setBtnCtnrStyle({})
    }
    const handleModify = (e) => {
        setDisabled(false)
        setEventStyle({
            boxShadow: "0 0 0 2px black"
        })
        setTitle(`Modification evènement ${index + 1}`)
        setEditMode(true)

    }
    const handleSaveEdit = () => {
        setDisabled(true)
        setEventStyle({})
        setTitle(`Evènement ${index + 1}`)
        db.collection('tour-dates').doc(event.id).set({
            salle,
            ville,
            time,
            lien,
            type
        })
        setEditMode(false)
        setBtnCtnrStyle({})

    }
    return (
        <li style={eventStyle} key={event.id} className="event-ctnr">
            <div className="event-header">
                {confirm
                    ? "êtes-vous sur de vouloir faire ca ?".toUpperCase()
                    : title.toUpperCase()
                }

                <div style={btnCtnrStyle} className="event-header__btnCtnr">
                    {confirm

                        ? <FontAwesomeIcon className="event-icons" icon={faCheck} onClick={() => {
                            db.collection("tour-dates").doc(event.id).delete()
                            setConfirm(false)
                        }} />
                        : editMode
                            ? null
                            : <FontAwesomeIcon className="event-icons" icon={faTrash} onClick={handleDelete} />}

                    {confirm
                        ? <FontAwesomeIcon className="event-icons" icon={faTimes} onClick={() => setConfirm(false)} />
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
                    onChange={e => {
                        setSalle(e.target.value)
                    }}
                    value={salle} ></input>

                <input
                    disabled={disabled}
                    onChange={e => {
                        setVille(e.target.value)
                    }}
                    value={ville} ></input>

                <input
                    disabled={disabled}
                    onChange={e => {
                        setTime(e.target.value)
                    }}
                    type='date'
                    value={time} ></input>

                <select
                    disabled={disabled}
                    onChange={e => {
                        setType(e.target.value)
                    }} defaultValue={type}>
                    <option value={0}>Type</option>
                    <option value={1}>Concert</option>
                    <option value={2}>Festival</option>
                </select>
                <input
                    disabled={disabled}
                    onChange={e => {
                        setLien(e.target.value)
                    }}
                    value={lien} ></input>

            </div>
        </li>);
}

export default Event;