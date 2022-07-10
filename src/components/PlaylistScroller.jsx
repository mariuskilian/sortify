import { useRef, useState } from "react";

import { mod } from "../utilities/math-util";
import styled from "styled-components";
import { useData } from "../contexts/DataContext";

export function PlaylistScroller(props) {
  const data = useData();

  const playlistScrollerRef = useRef();

  const [pageIdx, setPageIdx] = useState(0);

  let containedPlaylistIndices = [];
  data.playlists.forEach((playlist, i) => {
    if (playlist.tracks.map((t) => t.info.id).includes(props.songid))
      containedPlaylistIndices.push(i);
  });

  const numItems = containedPlaylistIndices.length;
  const numPages = Math.ceil(numItems / numItemsPerPage);

  const hoveredPlaylistDefaultText = `Contained in ${
    containedPlaylistIndices.length
  } playlist${containedPlaylistIndices.length === 1 ? "" : "s"}`;
  const [hoveredPlaylist, setHoveredPlaylist] = useState(
    hoveredPlaylistDefaultText
  );

  const updateHoveredPlaylist = (idx) =>
    setHoveredPlaylist(data.playlists[idx].info.name);

  const resetHoveredPlaylist = () =>
    setHoveredPlaylist(hoveredPlaylistDefaultText);

  const scrollLeft = () => setPageIdx((i) => mod(--i, numPages));
  const scrollRight = () => setPageIdx((i) => mod(++i, numPages));

  return (
    <PlaylistScrollerDiv ref={playlistScrollerRef}>
      {numPages > 1 && (
        <PageIndicatorContainer>
          {Array.apply(null, new Array(numPages)).map((_, i) => (
            <div
              key={`pi_${i}`}
              className={i === pageIdx ? "active" : ""}
            ></div>
          ))}
        </PageIndicatorContainer>
      )}
      <PlaylistartScrollWrapper onMouseLeave={() => resetHoveredPlaylist()}>
        {numPages > 1 && <ScrollBtn onClick={scrollLeft}>{"<"}</ScrollBtn>}
        <PlaylistartContainer pageIdx={pageIdx}>
          {containedPlaylistIndices.map((plIdx) => (
            <Playlistart
              key={data.playlists[plIdx].info.id}
              src={data.playlists[plIdx].info.images[1]?.url}
              alt={data.playlists[plIdx].info.name}
              onMouseEnter={() => updateHoveredPlaylist(plIdx)}
            />
          ))}
        </PlaylistartContainer>
        {numPages > 1 && <ScrollBtn onClick={scrollRight}>{">"}</ScrollBtn>}
      </PlaylistartScrollWrapper>
      <PlaylistartText>{hoveredPlaylist}</PlaylistartText>
    </PlaylistScrollerDiv>
  );
}

//#region Styles
let numItemsPerPage = 5;
const spaceBetween = "0.5rem";
const sliderPadding = "1.5rem";

const PlaylistScrollerDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #333;
  padding: 0.5em 0.25em;
  border-radius: 0.25em;
`;

const PlaylistartScrollWrapper = styled.span`
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.25em;

  :hover:not(.scroll-btn:hover) + .playlistart-text {
    color: #fff;
  }
`;

const PlaylistartContainer = styled.span`
  display: flex;
  width: calc(100% - 2 * ${sliderPadding});
  transition: transform 350ms ease-in-out;
  transform: translateX(calc(${(props) => props.pageIdx} * -100%));
`;

const Playlistart = styled.img`
  width: calc(100% / ${numItemsPerPage} - ${spaceBetween});
  flex: 0 0;
  aspect-ratio: 1 / 1;
  margin: 0 calc(${spaceBetween} / 2);
  border-radius: 5%;
  border: 1px solid #aaa;

  :not(:hover) {
    filter: brightness(50%);
  }
`;

const PlaylistartText = styled.div`
  width: 100%;
  margin: auto 0;
  text-align: center;
  color: #aaa;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ScrollBtn = styled.button`
  height: inherit;
  z-index: 10;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;

  :hover {
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const PageIndicatorContainer = styled.span`
  display: flex;
  justify-content: center;

  & div {
    height: 0.12em;
    width: 1.3em;
    margin: 0 0.12em 0.35em;
    background-color: #666;

    &.active {
      background-color: #aaa;
    }
  }
`;
//#endregion
