import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import './styles/Event.css'
import { db } from '../services/firebase';

const Event = ({ event, index }) => {
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

    const handleDelete = (e) => {
        setConfirm(true)
    }
    const handleAbortEdit = (e) => {
        setDisabled(true)
        setEventStyle({})
        setTitle(`Evènement ${index + 1}`)
        setEditMode(false)
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

    }
    return (
        <li style={eventStyle} key={event.id} className="event-ctnr">
            <div className="event-header">
                {confirm
                    ? "êtes-vous sur de vouloir faire ca ?".toUpperCase()
                    : title.toUpperCase()
                }

                <div className="event-header__btnCtnr">
                    {confirm

                        ? <button onClick={() => {
                            db.collection("tour-dates").doc(event.id).delete()
                            setConfirm(false)
                        }}>Oui</button>
                        : <button onClick={handleDelete}>Supprimer</button>}

                    {confirm
                        ? <button onClick={() => setConfirm(false)}>Non</button>
                        : editMode
                            ? <>
                                <button onClick={handleSaveEdit}>Sauver</button>
                                <button onClick={handleAbortEdit}>Annuler</button>
                            </>
                            : <button onClick={handleModify}>Modifier</button>
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