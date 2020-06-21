import React, { useEffect, useState, useContext } from 'react';
import './styles/NewsPanel.css'
import abnormal from '../assets/news-title.svg'
import { db } from '../services/firebase';
import { RoleContext } from '../contexts/RoleContext';
import AdminPanelNews from './AdminPanelNews';
import Fade from 'react-reveal/Fade';

const NewsPanel = () => {
    const [news, setNews] = useState([]);
    const [importantNews, setImportantNews] = useState(null);
    const [showOverlay, setOverlay] = useState(false)
    let isAdmin = useContext(RoleContext)
    useEffect(() => {
        return db.collection("news").onSnapshot((snapshot) => {
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
        if (e.target === overlay || e.target === modify || e.currentTarget === cross) {
            setOverlay(!showOverlay)
        }
    }


    return (
        <section className="newsPanel">
            <div className="news-title-ctnr">
                <img className="news-title" src={abnormal} alt="Abnormal"></img>
            </div>
            {isAdmin
                ? <button className="news__modify" onClick={handleClick}>Modifier</button>
                : null}
            <div className="news__container">
                <div className="news__importantNews">
                    {importantNews
                        ? <div style={{ width: "80%", height: "80%" }}>
                            <span>{importantNews.titre}</span>
                            <h2 className="importantNewsTitle">{importantNews.titre}</h2>
                            <div className="news__importantNews-imageCtnr">
                                {importantNews.image.length > 0
                                    ? <img src={importantNews.image} alt="Actualité importante"></img>
                                    : "Pas d'image"}
                            </div>
                            
                            <p style={{paddingTop:"30px",textAlign:"right", margin:0}}>Publié le  <strong>{`${(importantNews.publishDate).split('-')[2]}/${(importantNews.publishDate).split('-')[1]}`}</strong></p>
                            <div style={{ display: "flex", flexDirection: "column", textAlign: "right", marginTop: "20px" }}>
                                <h2 className="news-subtitle">{importantNews.subtitle}</h2>
                                <p>{(importantNews.description).split('\n').map((text, i) => {
                                    return <div key={i}> {text} <br /></div>
                                })}</p>
                            </div>

                        </div>
                        : null
                    }
                </div>
                <ul className="news__news-list">
                    {news.map((data, i) => {
                        return (
                            <li key={i} >
                                <span>{data.titre}</span>
                                <h2 className="news-title-data">{data.titre}</h2>
                                <p style={{padding:0, margin:0}}>Publié le  <strong>{`${(data.publishDate).split('-')[2]}/${(data.publishDate).split('-')[1]}`}</strong></p>
                                <div className="news__news-body">
                                    <div className="news__news-imageCtnr">
                                        {data.image.length > 0
                                            ? <img src={data.image} alt="Actualité"></img>
                                            : "Pas d'image"}<br></br>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <h2 className="news-subtitle">{data.subtitle}</h2>
                                        <p>{(data.description).split('\n').map((text, i) => {
                                            return <div key={i}> {text} <br /></div>
                                        })}</p>
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