import "./SongList.css";
import { Song } from "../Song";
import { SongListHeader } from "../SongListHeader";
import { useClassicSelector } from "../../hooks/classicSelector";

export function SongList(props) {
  const [selectSong, selectedSongs] = useClassicSelector();

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
        {props.tracklist?.map((track, i) => {
          const trackinfo = track.info;
          return (
            <span
              key={`song${trackinfo.id}`}
              onMouseDown={() => selectSong(i, true)}
            >
              <Song
                index={i}
                selectionClasses={getSelectClassNames(i)}
                info={{
                  id: trackinfo.id,
                  songname: trackinfo.name,
                  artists: trackinfo.artists.map((a) => a.name),
                  album: trackinfo.album.name,
                  albumart: trackinfo.album.images[1].url,
                }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}
