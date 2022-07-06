import "./Song.css";
import { ms2minSec } from "../../utilities/time";

export function Song(props) {
  const songinfo = props.songinfo;

  return (
    <div
      className={`song-banner ${props.selectionClasses}`}
      onMouseDown={() => props.onClick(props.index)}
      draggable
    >
      <div className="song-index">
        <div className="vertical-container">{props.index + 1}</div>
      </div>
      <img className="albumart" src={songinfo.albumart} alt=""></img>
      <div className="songinfo">
        <div className="songname-artist-wrapper">
          <div className="vertical-container">
            <div className="songname">{songinfo.songname}</div>
            <div className="artist">{songinfo.artist}</div>
          </div>
        </div>
        <div className="album">
          <div className="vertical-container">{songinfo.album}</div>
        </div>
        <div className="songlength">
          <div className="vertical-container">
            {ms2minSec(songinfo.songlength)}
          </div>
        </div>
        <div className="context-menu">
          <div className="vertical-container">.</div>
        </div>
      </div>
    </div>
  );
}
