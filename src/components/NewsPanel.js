import React, { useEffect, useState, useContext } from 'react';
import './styles/NewsPanel.css'
import { db } from '../services/firebase';
import { auth } from 'firebase';
import { RoleContext } from '../contexts/RoleContext';
import AdminPanelNews from './AdminPanelNews';

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
        if (e.target == overlay || e.target == modify) {
            setOverlay(!showOverlay)
        }
    }


    return (
        <section className="newsPanel">
            <h1>{"actualités".toUpperCase()}</h1>
            {isAdmin
                ? <a className="news__modify" style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "60px",
                    right: "50px",
                }} onClick={handleClick}>Modifier</a>
                : null}
            <div className="news__container">
                <div className="news__importantNews">
                    {importantNews
                        ? <>
                            <span style={{ fontSize: "35px" }}>{importantNews.titre}</span>
                            <div className="news__importantNews-imageCtnr">
                                {importantNews.image.length > 0
                                    ? <img src={importantNews.image}></img>
                                    : "Pas d'image"}
                            </div>
                            <p>{importantNews.description}</p>
                        </>
                        : null
                    }
                </div>
                <ul className="news__news-list">
                    {news.map(data => {
                        return (
                            <li key={data.id} >
                                <span style={{
                                    fontSize: "35px",
                                    borderBottom: "4px solid #FFC045",
                                    width: "80%"
                                }}>{data.titre}</span>
                                <div className="news__news-imageCtnr">
                                    {data.image.length > 0
                                        ? <img src={data.image}></img>
                                        : "Pas d'image"}<br></br>

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