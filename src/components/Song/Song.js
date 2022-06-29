import "./Song.css";

export function Song(props) {
  return (
    <div className="song-banner">
      <div className="song-index">
        <div className="vertical-container">{props.index}</div>
      </div>
      <img className="albumart" src={props.albumart} alt=""></img>
      <div className="songinfo">
        <div className="songname-artist-wrapper">
          <div className="vertical-container">
            <div className="songname">{props.songname}</div>
            <div className="artist">{props.artist}</div>
          </div>
        </div>
        <div className="album">
          <div className="vertical-container">{props.album}</div>
        </div>
        <div className="songlength">
          <div className="vertical-container">{props.songlength}</div>
        </div>
        <div className="context-menu">
          <div className="vertical-container">.</div>
        </div>
      </div>
    </div>
  );
}
