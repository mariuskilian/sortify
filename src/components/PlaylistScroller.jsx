import styled, {css} from "styled-components";
import { useRef, useState } from "react";

import { mod } from "../utilities/math-util";
import { useData } from "../contexts/DataContext";

export function PlaylistScroller(props) {
  //#region JS
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
  //#endregion

  //#region HTML
  return (
    <PlaylistScrollerDiv ref={playlistScrollerRef}>
      <PageIndicatorContainer>
        {Array.apply(null, new Array(numPages === 1 ? 0 : numPages)).map((_, i) => (
          <div
            key={`pi_${i}`}
            className={i === pageIdx ? "active" : ""}
          ></div>
        ))}
      </PageIndicatorContainer>
      <PlaylistartScrollWrapper onMouseLeave={() => resetHoveredPlaylist()}>
        {numPages > 1 && <ScrollBtn left onClick={scrollLeft}>{"<"}</ScrollBtn>}
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
        {numPages > 1 && <ScrollBtn right onClick={scrollRight}>{">"}</ScrollBtn>}
      </PlaylistartScrollWrapper>
      <PlaylistartText>{hoveredPlaylist}</PlaylistartText>
    </PlaylistScrollerDiv>
  );
  //#endregion
}

//#region Styles
let numItemsPerPage = 6;
const spaceBetween = "0.5rem";
const sliderPadding = "1.5rem";
const plBorderRadius = "0.25rem";

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

const PlaylistScrollerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #333;
  padding: 0.5em 0;
  border-radius: ${plBorderRadius};
`;

const PlaylistartText = styled.div`
  width: 100%;
  height: 1.5em;
  margin: auto 0;
  text-align: center;
  color: #aaa;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ScrollBtn = styled.button`
  height: 100%;
  width: ${sliderPadding};
  z-index: 10;
  border: none;
  background-color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
  color: white;
  transition: background-color 250ms ease-in-out;

  :hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  ${(props) => {
    if (props.left) return css`
      margin-right: calc(${spaceBetween} / 2);
      border-top-right-radius: ${plBorderRadius};
      border-bottom-right-radius: ${plBorderRadius};
    `;
    if (props.right) return css`
      margin-left: calc(${spaceBetween} / 2);
      border-top-left-radius: ${plBorderRadius};
      border-bottom-left-radius: ${plBorderRadius};
    `;
  }}
`;

const PlaylistartContainer = styled.span`
  display: flex;
  width: calc(100% - 2 * ${sliderPadding});
  transition: transform 350ms ease-in-out;
  transform: translateX(calc(${(props) => props.pageIdx} * -100%));
`;

const PlaylistartScrollWrapper = styled.span`
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  width: 100%;
  height: fit-content;
  margin-bottom: 0.25em;

  &:hover:not(:has(${ScrollBtn}:hover)) ~ ${PlaylistartText} {
    color: #fff;
  }
`;

const PageIndicatorContainer = styled.span`
  height: 0.12em;
  margin: 0 0 0.35em;
  display: flex;
  justify-content: center;

  & div {
    height: 100%;
    width: 1.2em;
    margin: 0 0.12em;
    background-color: #666;

    &.active {
      background-color: #aaa;
    }
  }
`;
//#endregion
