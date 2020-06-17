import React from 'react';
import albumImage from '../assets/albumImage.png'
import albumSvg from '../assets/album-title.svg'
import spotifySvg from '../assets/spotify.svg'
import deezerSvg from '../assets/deezer.svg'
import appleSvg from '../assets/apple.svg'
import playArrow from '../assets/play-arrow.svg'
import Fade from 'react-reveal/Fade';
import './styles/Album.css'
const Album = () => {
    const albumTitles = [
        "The Adults Are Talking",
        "Selflees",
        "Brooklyn Bridge To Chorus",
        "Bad Decisions",
        "Eternal Summer",
        "At The Door",
        "Why Are Sundays So Depressing",
        "Not The Same Anymore",
        "Ode To The Mets"]
    const musicMedias = [
        { icon: deezerSvg, lien: "https://www.deezer.com/fr/artist/569" },
        { icon: appleSvg, lien: "https://music.apple.com/fr/artist/the-strokes/560289" },
        { icon: spotifySvg, lien: "https://open.spotify.com/artist/0epOFNiUfyON9EYx7Tpr6V" }]
    return (
        <section className="album">
            <img className="albumSvg" src={albumSvg}></img>
            <div className="album__left">
                <img src={albumImage}></img>
            </div>
            <div className="album__right">
                <div className="album__tracklist">

                    <Fade bottom >
                        {albumTitles.map((title, i) => <p key={i}><span>{i + 1}</span> {i + 1} {title}</p>)}

                    </Fade>
                </div>
                <div className="album__available">

                    <Fade bottom >
                        <div className="album__available-text" >
                            <img src={playArrow}></img>
                            <p>Bientot disponible sur : </p>
                        </div>
                        <div className="album__music-medias">
                            {musicMedias.map((media, i) => <a href={media.lien} target="_blank" style={{ color: "rgb(0, 0, 0)" }} key={i}><img src={media.icon}></img></a>)}
                        </div>
                    </Fade>
                </div>
            </div>
        </section >
    );
}

export default Album;