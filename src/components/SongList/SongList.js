import "./SongList.css";
import { Song } from "../Song";
import { SongListHeader } from "../SongListHeader";
import { useSelector } from "../../hooks/selector";

export function SongList(props) {
  const [selectSong, selectedSongs] = useSelector();

  function getSelectClassNames(i) {
    let classes = "";
    if (selectedSongs.includes(i)) {
      classes += "selected";
      if (i === 0 || !selectedSongs.includes(i - 1)) classes += " first-select";
      if (!selectedSongs.includes(i + 1)) classes += " last-select";
    }
    return classes;
  }

  return (
    <div className="song-list-wrapper noselect">
      <SongListHeader />
      <div className="song-list">
        <div className="song-list-padding"></div>
        {props.tracklist?.map((track, i) => {
          const trackinfo = track.info;
          return (
            <Song
              key={`song${trackinfo.id}`}
              onClick={selectSong}
              index={i}
              selectionClasses={getSelectClassNames(i)}
              songinfo={{
                songname: trackinfo.name,
                artist: trackinfo.artists[0].name,
                album: trackinfo.album.name,
                songlength: trackinfo.duration_ms,
                albumart: trackinfo.album.images[1].url,
              }}
            />
          );
        })}
        <div className="song-list-padding"></div>
      </div>
    </div>
  );
}
