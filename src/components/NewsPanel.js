import React, { useEffect, useState, useContext } from 'react';
import './styles/NewsPanel.css'
import { db } from '../services/firebase';
import { auth } from 'firebase';
import { RoleContext } from '../contexts/RoleContext';
import AdminPanelNews from './AdminPanelNews';
import Fade from 'react-reveal/Fade';

const NewsPanel = () => {
    const [news, setNews] = useState([]);
    const [importantNews, setImportantNews] = useState(null);
    const [showOverlay, setOverlay] = useState(false)
    const NewsRef = db.collection("news")
    let isAdmin = useContext(RoleContext)
    useEffect(() => {
        return NewsRef.onSnapshot((snapshot) => {
            const newsData = []
            setImportantNews(null)
            snapshot.forEach(doc => {
                if (doc.data().important) {
                    setImportantNews(({ ...doc.data(), id: doc.id }))
                } else {
                    newsData.push(({ ...doc.data(), id: doc.id }))
                }
            })
            setNews(newsData.reverse())
        })
    }, [])

    const handleClick = (e) => {
        const overlay = document.querySelector('.news__admin-panel')
        const modify = document.querySelector('.news__modify')
        const cross = document.querySelector('.td__admin-panel-cross')
        if (e.target == overlay || e.target == modify || e.currentTarget == cross) {
            setOverlay(!showOverlay)
        }
    }


    return (
        <section className="newsPanel">
            {isAdmin
                ? <a className="news__modify" style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "55px",
                    right: "50px",
                    zIndex: "9"
                }} onClick={handleClick}>Modifier</a>
                : null}
            <div className="news__container">
                <div className="news__importantNews">
                    {importantNews
                        ? <div style={{ width: "80%", height: "80%" }}>
                            <Fade bottom>
                                <span>{importantNews.titre}</span>
                                <h2 style={{ fontSize: "25px", fontFamily: "Jost", letterSpacing: "0.2em" }}>{importantNews.titre}</h2>
                            </Fade>
                            <div className="news__importantNews-imageCtnr">
                                {importantNews.image.length > 0
                                    ? <img src={importantNews.image}></img>
                                    : "Pas d'image"}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", textAlign: "right", marginTop: "20px" }}>
                                <Fade bottom>
                                    <h2 style={{ margin: 0, textTransform: "none" }}>{importantNews.subtitle}</h2>
                                    <p>{(importantNews.description).split('\n').map((text, i) => {
                                        return <> {text} <br /></>
                                    })}</p>
                                </Fade>
                            </div>

                        </div>
                        : null
                    }
                </div>
                <ul className="news__news-list">
                    {news.map(data => {
                        return (
                            <li key={data.id} >
                                <Fade bottom>
                                    <span>{data.titre}</span>
                                    <h2 style={{
                                        fontSize: "20px",
                                        borderBottom: "4px solid #FFC045",
                                        width: "65%",
                                        zIndex: "9",
                                        fontFamily: "Jost",
                                        letterSpacing: "0.2em"
                                    }}>{data.titre}</h2>
                                </Fade>
                                <div className="news__news-body">
                                    <div className="news__news-imageCtnr">
                                        {data.image.length > 0
                                            ? <img src={data.image}></img>
                                            : "Pas d'image"}<br></br>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Fade bottom>
                                            <h2 style={{ margin: 0, textTransform: "none" }}>{data.subtitle}</h2>
                                            <p>{(data.description).split('\n').map((text, i) => {
                                                return <> {text} <br /></>
                                            })}</p>
                                        </Fade>
                                    </div>
                                </div>
                            </li>
                        )
                    })}

                </ul>
            </div>

            {
                showOverlay
                    ? <AdminPanelNews handleClick={handleClick} />
                    : null
            }
        </section >
    );
}

export default NewsPanel;