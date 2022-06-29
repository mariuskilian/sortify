import { Song } from "../Song";
import { ms2minSec } from "../../utilities/time";
import { SongListHeader } from "../SongListHeader";
import "./SongList.css";

export function SongList(props) {
  return (
    <div className="song-list-wrapper noselect">
      <SongListHeader />
      <div className="song-list">
        <div className="song-list-padding"></div>
        {props.tracklist?.map((_track, i) => {
          const track = _track.track;
          return (
            <Song
              key={`song_${i}`}
              index={i + 1}
              songname={track.name}
              artist={track.artists[0].name}
              album={track.album.name}
              songlength={ms2minSec(track.duration_ms)}
              albumart={track.album.images[1].url}
            />
          );
        })}
        <div className="song-list-padding"></div>
      </div>
    </div>
  );
}
