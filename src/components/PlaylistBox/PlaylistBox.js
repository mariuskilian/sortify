import { SongList } from "../SongList";
import "./PlaylistBox.css";

export function PlaylistBox(props) {
  const playlist = props.playlist;
  return (
    <>
      <h3>{playlist?.name}</h3>
      <div className="playlist-box">
        <SongList tracklist={playlist?.tracks} />
      </div>
    </>
  );
}
