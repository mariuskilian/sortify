import { SongList } from "./SongList";
import styled from "styled-components";

export function PlaylistBox(props) {
  const playlistInfo = props.playlistInfo;
  const tracklist = props.tracklist;
  return (
    <>
      <h3>{playlistInfo?.name}</h3>
      <PlaylistBoxDiv>
        <SongList tracklist={tracklist} />
      </PlaylistBoxDiv>
    </>
  );
}

//#region Styles
const PlaylistBoxDiv = styled.div`
  background-color: #222;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #aaa;
  max-height: 410px;
`;
//#endregion
