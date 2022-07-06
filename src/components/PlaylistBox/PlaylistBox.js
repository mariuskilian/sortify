import { SongList } from "../SongList";
import "./PlaylistBox.css";

export function PlaylistBox(props) {
  const playlistInfo = props.playlistInfo;
  const tracklist = props.tracklist;
  return (
    <>
      <h3>{playlistInfo?.name}</h3>
      <div className="playlist-box">
        <SongList tracklist={tracklist} />
      </div>
    </>
  );
}
