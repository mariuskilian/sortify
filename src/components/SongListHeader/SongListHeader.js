import "./SongListHeader.css";

export function SongListHeader() {
  return (
    <div className="header-wrapper">
      <div className="song-list-header">
        <div className="song-index-header">#</div>
        <div className="song-info-header">
          <div className="songname-artist-header">TITLE/ARTIST</div>
          <div className="album-header">ALBUM</div>
          <div className="song-length-header">TIME</div>
          <div className="context-menu-header"></div>
        </div>
      </div>
    </div>
  );
}
