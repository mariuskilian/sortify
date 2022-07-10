import "../styles/globals.css";

import { Song } from "./Song";
import { SongListHeader } from "./SongListHeader";
import styled from "styled-components";
import { useClassicSelector } from "../hooks/classicSelector";

export function SongList(props) {
  //#region JS
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
  //#endregion

  //#region HTML
  return (
    <SongListWrapper className="noselect">
      <SongListHeader />
      <SongListDiv className="noscrollbar">
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
      </SongListDiv>
    </SongListWrapper>
  );
  //#endregion
}

//#region Styles
const SongListWrapper = styled.div`
  max-height: inherit;
  flex-flow: column;
  display: flex;
`;

const SongListDiv = styled.div`
  margin: 2px 0;
  padding: 0.5rem 0;
  overflow-y: auto;
`;
//#endregion
