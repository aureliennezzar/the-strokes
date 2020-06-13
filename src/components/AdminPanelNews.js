import React, { useState, useEffect } from 'react';
import { db, storageRef } from '../services/firebase';
import './styles/AdminPanelNews.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import News from './News';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
const AdminPanelNews = (props) => {

    const classes = useStyles();
    const { handleClick } = props
    const [news, setNews] = useState([]);
    const [newNews, setNewNews] = useState(false)
    const [open, setOpen] = useState(false);

    const [state, setState] = useState({
        titre: "",
        publishDate: "",
        description: "",
        image: "",
        important: false
    })

    useEffect(() => {
        return db.collection('news').onSnapshot((snapshot) => {
            const newsData = []
            snapshot.forEach(doc => newsData.push(({ ...doc.data(), id: doc.id })))
            setNews(newsData)
        })
    }, [])
    const handleChange = (e) => {
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
            .then(url => {
                setState({
                    ...state,
                    image: url,
                })
                setOpen(false)
            })
    }
    const handleAdd = () => {
        setNewNews(true)
    }
    const handleAbort = () => {
        setNewNews(false)
    }
    const handleConfirm = () => {
        const { titre, description, image, publishDate, important } = state

        db.collection("news").doc(`news-${publishDate}`).set({
            titre,
            description,
            image,
            publishDate,
            important
        })
        setState({
            titre: "",
            publishDate: "",
            description: "",
            image: "",
            important: false
        })
        setNewNews(false)
    }

    return (
        <div className="news__admin-panel" onClick={handleClick}>
            <div className="news__admin-panel-ctnr">

                <div className="news__adminpanel__header">
                    <h1 className="news__adminpanel__title">Modifier Actualités</h1>
                    <button onClick={handleAdd}>Ajouter une actualité</button>
                </div>

                <div style={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto"
                }}>
                    <ul className="news__admin-panel-datesList">
                        {newNews
                            ?
                            <li className="news-ctnr">
                                <div className="news-header">
                                    {"Nouvel actualité".toUpperCase()}
                                    <div className="news-header__btnCtnr">
                                        <button onClick={handleConfirm}>Confirmer</button>
                                        <button onClick={handleAbort}>Annuler</button>
                                    </div>
                                </div>
                                <div className="news-body">
                                    <input placeholder="Titre de l'actualité" name="titre" onChange={handleChange} value={state.titre}></input>
                                    <input placeholder="Date" name="publishDate" type="date" onChange={handleChange} value={state.publishDate}></input><br></br>
                                    <textarea style={{ resize: "none" }} placeholder="Description" rows="5" cols="60" name="description" onChange={handleChange} value={state.description}>

                                    </textarea><br></br>
                                    <label for="file" className="label-file">Ajouter / Modifier l'image</label>
                                    <input id="file" className="input-file" type="file" accept="image/*" onChange={handleUpload}></input>
                                </div>

                                <div className="news-body2">
                                    <div className="news-imageCtnr">
                                        {state.image.length > 0
                                            ? <img src={state.image}></img>
                                            : "Pas d'image"}
                                    </div>
                                </div>
                            </li>
                            : null}
                        {news.map((data, i) => (
                            <News news={data} index={i} />
                        ))}
                    </ul>
                </div>
            </div>

            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >
    );
}

export default AdminPanelNews;