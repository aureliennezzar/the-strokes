import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import './styles/News.css'
import { db, storageRef } from '../services/firebase';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import fullstar from '../assets/fullStar.svg'
import emptystar from '../assets/emptyStar.svg'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
const News = ({ news, index, isImportant }) => {
    const classes = useStyles();

    const [state, setState] = useState({
        titre: news.titre,
        description: news.description,
        publishDate: news.publishDate,
        image: news.image,
        important: news.important,
        subtitle: news.subtitle,
        titreActu: "Actualité ",
        open: false,
        disabled: true,
        editMode: false,
        confirm: false,
        dateChanged: false,
        newsStyle: {},
        btnCtnrStyle: {}
    })
    const { titre,
        description,
        publishDate,
        image,
        important,
        subtitle,
        titreActu,
        open,
        disabled,
        editMode,
        confirm,
        dateChanged,
        newsStyle,
        btnCtnrStyle } = state

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeDate = (e) => {
        setState({
            ...state,
            dateChanged: true,
            [e.target.name]: e.target.value
        })
    }

    const handleUpload = (e) => {
        setState({
            open: true
        })
        const file = e.target.files[0]
        const name = new Date() + '-' + file.name
        const metadata = {
            contentType: file.type,
        }
        const task = storageRef.child(name).put(file, metadata)
        task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(image => {
                setState({
                    ...state,
                    image,
                    open: false
                })
            })
    }
    const handleDelete = (e) => {
        setState({
            ...state,
            confirm: true,
            btnCtnrStyle: { width: "40px" }
        })
    }
    const handleFavourite = (e) => {
        db.collection("news").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                db.collection('news').doc(doc.id).update({
                    important: false
                }).then(
                    db.collection('news').doc(news.id).update({
                        important: !isImportant
                    }))
            });
        });
    }
    const handleAbortEdit = (e) => {
        setState({
            ...state,
            disabled: true,
            editMode: false,
            titreActu: "Actualité ",
            newsStyle: {},
            btnCtnrStyle: {}
        })
    }
    const handleModify = (e) => {
        setState({
            ...state,
            disabled: false,
            editMode: true,
            titreActu: "Modification actualité ",
            newsStyle: {
                boxShadow: "0 0 0 2px black"
            },
            btnCtnrStyle: { width: "40px" }
        })
    }
    const handleSaveEdit = () => {
        setState({
            ...state,
            disabled: true,
            editMode: false,
            titreActu: "Actualité ",
            newsStyle: {},
            btnCtnrStyle: {}
        })
        if (dateChanged) {
            db.collection("news").doc(news.id).delete()
            db.collection('news').doc(`news-${publishDate}`).set({
                titre,
                description,
                image,
                publishDate,
                important: isImportant,
                subtitle
            })

        } else {
            db.collection('news').doc(news.id).set({
                titre,
                description,
                image,
                publishDate,
                important: isImportant,
                subtitle
            })
        }
    }
    return (
        <li style={newsStyle} className="news-ctnr">
            <div className="news-header">
                {confirm
                    ? "êtes-vous sur de vouloir faire ca ?".toUpperCase()
                    : `${titreActu} ${index + 1}`.toUpperCase()
                }

                <div style={btnCtnrStyle} className="news-header__btnCtnr">

                    {confirm

                        ? <FontAwesomeIcon className="event-icons" icon={faCheck} onClick={() => {
                            db.collection("news").doc(news.id).delete()
                            setState({
                                ...state,
                                confirm: false
                            })
                        }} />
                        : editMode
                            ? null :
                            <>
                                <div className="starCtnr" onClick={handleFavourite}>{isImportant ? <img className="starImage star" src={fullstar}></img> : <img className="emptyStarImage star" src={emptystar}></img>}</div>
                                <FontAwesomeIcon className="event-icons" icon={faTrash} onClick={handleDelete} />
                            </>}

                    {confirm
                        ? <FontAwesomeIcon className="event-icons" icon={faTimes} onClick={() =>
                            setState({
                                ...state,
                                confirm: false,
                                btnCtnrStyle: {}
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
            <div className="news-body">
                <input
                    disabled={disabled}
                    onChange={handleChange}
                    name="titre"
                    value={titre} ></input>
                <input
                    disabled={disabled}
                    onChange={handleChange}
                    name="subtitle"
                    value={subtitle} ></input>

                <input
                    disabled={disabled}
                    onChange={handleChangeDate}
                    type='date'
                    name="publishDate"
                    value={publishDate} ></input>
                <textarea style={{ resize: "none" }}
                    disabled={disabled}
                    rows="5" cols="60"
                    onChange={handleChange}
                    name="description"
                    value={description} >
                </textarea><br></br>


                {editMode
                    ? <><label style={
                        disabled
                            ? {
                                cursor: "default",
                                background: "#a5a4a4",
                                color: "#000"
                            }
                            : {}
                    } htmlFor="file" className="label-file">Ajouter / Modifier l'image</label>
                        <input
                            disabled={disabled}
                            id="file"
                            className="input-file"
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}></input></>
                    : null
                }

            </div>

            <div className="news-body2">
                <div className="news-imageCtnr">
                    {image.length > 0
                        ? <img src={image}></img>
                        : "Pas d'image"}
                </div>
            </div>

            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </li>);
}

export default News;