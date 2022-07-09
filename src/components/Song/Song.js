import { PlaylistScroller } from "../PlaylistScroller";
import "./Song.css";

export function Song(props) {
  const songinfo = props.info;

  return (
    <div className={`song-banner ${props.selectionClasses}`}>
      <div className="song-index">{props.index + 1}</div>
      <img className="albumart" src={songinfo.albumart} alt=""></img>
      <div className="songinfo-content">
        <div className="songname-artist-wrapper">
          <div className="songname">{songinfo.songname}</div>
          <div className="artist-album">
            {`${songinfo.artists.join([", "])} \u2022 ${songinfo.album}`}
          </div>
        </div>
        <div className="playlist-scroller-wrapper">
          <PlaylistScroller songid={songinfo.id} />
        </div>
      </div>
      <div className="context-menu">.</div>
    </div>
  );
}
