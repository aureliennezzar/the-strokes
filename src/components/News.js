import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/News.css'
import { db, storageRef } from '../services/firebase';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
const News = ({ news, index }) => {
    const classes = useStyles();
    const {
        titre,
        description,
        publishDate,
        image,
        important } = news
    const [state, setState] = useState({
        titre,
        description,
        publishDate,
        image,
        important
    })

    const [open, setOpen] = useState(false);
    const [titreActu, setTitreActu] = useState(`Actualité ${index + 1}`)
    const [disabled, setDisabled] = useState(true)
    const [newsStyle, setNewsStyle] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [dateChanged, setDateChanged] = useState(false)

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeDate = (e) => {
        setDateChanged(true)
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleUpload = (e) => {
        console.log(e.target.files[0])
        setOpen(true)
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
                    image
                })
                setOpen(false)
            })
    }
    const handleDelete = (e) => {
        setConfirm(true)
    }
    const handleFavourite = (e) => {
        console.log(news.id);
        db.collection("news").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                db.collection('news').doc(doc.id).update({
                    important: false
                }).then(
                    db.collection('news').doc(news.id).update({
                        important: !important
                    }))
            });
        });
    }
    const handleAbortEdit = (e) => {
        setDisabled(true)
        setNewsStyle({})
        setTitreActu(`Actualité ${index + 1}`)
        setEditMode(false)
    }
    const handleModify = (e) => {
        setDisabled(false)
        setNewsStyle({
            boxShadow: "0 0 0 2px black"
        })
        setTitreActu(`Modification actualité ${index + 1}`)
        setEditMode(true)

    }
    const handleSaveEdit = () => {
        setDisabled(true)
        setNewsStyle({})
        setTitreActu(`Actualité ${index + 1}`)
        if (dateChanged) {
            db.collection("news").doc(news.id).delete()
            db.collection('news').doc(`news-${state.publishDate}`).set({
                titre: state.titre,
                description: state.description,
                image: state.image,
                publishDate: state.publishDate,
            })

        } else {

        }
        setEditMode(false)

    }
    return (
        <li style={newsStyle} key={news.id} className="news-ctnr">
            <div className="news-header">
                {confirm
                    ? "êtes-vous sur de vouloir faire ca ?".toUpperCase()
                    : titreActu.toUpperCase()
                }

                <div className="news-header__btnCtnr">
                    <button onClick={handleFavourite}>{important ? "important" : "not important"}</button>
                    {confirm

                        ? <button onClick={() => {
                            db.collection("news").doc(news.id).delete()
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
            <div className="news-body">
                <input
                    disabled={disabled}
                    onChange={handleChange}
                    name="titre"
                    value={state.titre} ></input>

                <input
                    disabled={disabled}
                    onChange={handleChangeDate}
                    type='date'
                    name="publishDate"
                    value={state.publishDate} ></input>
                <textarea style={{ resize: "none" }}
                    disabled={disabled}
                    rows="5" cols="60"
                    onChange={handleChange}
                    name="description"
                    value={state.description} >
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
                        ? <img src={state.image}></img>
                        : "Pas d'image"}
                </div>
            </div>

            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </li>);
}

export default News;