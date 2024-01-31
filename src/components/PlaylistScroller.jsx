import styled, { css } from "styled-components";
import { useEffect, useMemo, useState } from "react";

import { KEY__ITEMS_PER_PAGE } from "./PlaylistScrollerCalculator";
import { mod } from "../utilities/math-util";
import { useData } from "../contexts/DataContext";
import { usePropertyValue } from "../hooks/propertyValue";

export const PLAYLISTSCROLLER_ID = "playlist-scroller";

export function PlaylistScroller(props) {
  //#region JS
  const data = useData();

  const [pageIdx, setPageIdx] = useState(0);

  const [itemsPerPage, setItemsPerPage] = usePropertyValue(KEY__ITEMS_PER_PAGE);

  const containedPlaylistIndices = useMemo(() => {
    let result = [];
    data.playlists.forEach((playlist, i) => {
      if (playlist.tracks.map((t) => t.info.id).includes(props.songid))
        result.push(i);
    });
    return result;
  }, [data.playlists, props.songid]);

  const numItems = containedPlaylistIndices.length;
  const numPages = Math.ceil(numItems / Math.max(1, itemsPerPage));

  const ippObserver = new MutationObserver((mutations) => {
    const currentValue =
      mutations[0].target.style.getPropertyValue(KEY__ITEMS_PER_PAGE);
    setItemsPerPage(Math.min(numItems, currentValue));
  });
  ippObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
  });

  useEffect(() => {
    if (pageIdx >= numPages) setPageIdx(0);
    // eslint-disable-next-line
  }, [itemsPerPage]);

  const hoveredPlaylistDefaultText = `Contained in ${
    containedPlaylistIndices.length
  } playlist${containedPlaylistIndices.length === 1 ? "" : "s"}`;
  const [hoveredPlaylist, setHoveredPlaylist] = useState(
    hoveredPlaylistDefaultText
  );

  const [hover, setHover] = useState(false);
  const updateHoveredPlaylist = (idx) => {
    setHover(true);
    setHoveredPlaylist(data.playlists[idx].info.name);
  };
  const resetHoveredPlaylist = () => {
    setHover(false);
    setHoveredPlaylist(hoveredPlaylistDefaultText);
  };

  const scrollLeft = () => setPageIdx((i) => mod(--i, numPages));
  const scrollRight = () => setPageIdx((i) => mod(++i, numPages));

  const ScrollButton = ({ side }) => {
    const isLeft = side === "left";
    const scroll = isLeft ? scrollLeft : scrollRight;
    const label = isLeft ? "<" : ">";
    return (
      numPages > 1 && (
        <ScrollBtn
          onMouseEnter={resetHoveredPlaylist}
          side={side}
          onClick={scroll}
        >
          {label}
        </ScrollBtn>
      )
    );
  };
  //#endregion

  //#region HTML
  return (
    <PlaylistScrollerDiv
      // Prevents song banner from being selected
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      itemsPerPage={itemsPerPage}
      isLoading={itemsPerPage === "0"}
      id={PLAYLISTSCROLLER_ID}
    >
      <PageIndicatorContainer>
        {Array(itemsPerPage === "0" || numPages === 1 ? 0 : numPages)
          .fill(true)
          .map((_, i) => (
            <div key={`pi_${i}`} className={i === pageIdx ? "active" : ""} />
          ))}
      </PageIndicatorContainer>

      <PlaylistartScrollWrapper
        onMouseLeave={() => resetHoveredPlaylist()}
        hover={hover}
      >
        <ScrollButton side="left" />

        <PlaylistartContainer pageIdx={pageIdx}>
          <PlaylistartContainerPadding />
          {containedPlaylistIndices.map((plIdx) => (
            <Playlistart
              key={data.playlists[plIdx].info.id}
              src={data.playlists[plIdx].info.images[1]?.url}
              alt={data.playlists[plIdx].info.name}
              onMouseEnter={() => updateHoveredPlaylist(plIdx)}
            />
          ))}
          <PlaylistartContainerPadding />
        </PlaylistartContainer>

        <ScrollButton side="right" />
      </PlaylistartScrollWrapper>
      <PlaylistartText>{hoveredPlaylist}</PlaylistartText>
    </PlaylistScrollerDiv>
  );
  //#endregion
}

//#region Styles

export const CSS_REM__SLIDER_PADDING = 1.5;
export const CSS_REM__MIN_SPACE_BETWEEN = 0.75;
export const CSS_REM__PLAYLISTART_SIZE = 3.5;

const sliderPadding = `${CSS_REM__SLIDER_PADDING}rem`;
const playlistartSize = `${CSS_REM__PLAYLISTART_SIZE}rem`;
const plBorderRadius = "0.25rem";

const initialFade = css`
  opacity: 1;
  ${(props) => {
    if (props.isLoading)
      return css`
        opacity: 0;
      `;
  }}
  transition: opacity 250ms ease-out;
`;

const PlaylistScrollerDiv = styled.div`
  ${initialFade};

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #333;
  padding: 0.5em 0;
  border-radius: 0.5em;
  overflow: hidden;

  --ipp: ${(props) => props.itemsPerPage};
  --total-space: calc(100% - var(--ipp) * ${playlistartSize});
  --space-between: calc(var(--total-space) / (var(--ipp) + 1));
`;

const Playlistart = styled.img`
  flex: 0 0;
  aspect-ratio: 1 / 1;
  border-radius: ${plBorderRadius};
  border: 1px solid #aaa;
  height: ${playlistartSize};
  margin: 0 calc(var(--space-between) / 2);
  transition: margin 350ms ease-out;

  &:not(:hover) {
    filter: brightness(65%);
  }
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
  position: absolute;
  height: calc(100% + 2px);
  top: -1px;
  width: calc(${sliderPadding} + 4px);
  border: none;
  z-index: 10;
  flex: 0 0 1;
  background-color: #333a;
  font-weight: bold;
  color: white;
  border: 0 solid #aaa0;
  transition: border 350ms ease-in-out, background-color 200ms ease-in-out;
  &:hover {
    background-color: #3334;
    border: 2px solid #aaa;
  }

  ${(props) => {
    if (props.side === "left")
      return css`
        left: -3px;
        border-top-right-radius: ${plBorderRadius};
        border-bottom-right-radius: ${plBorderRadius};
      `;
    if (props.side === "right")
      return css`
        right: -3px;
        border-top-left-radius: ${plBorderRadius};
        border-bottom-left-radius: ${plBorderRadius};
      `;
  }}
`;

const PlaylistartContainer = styled.span`
  display: flex;
  flex: 0 0 1;
  width: calc(100% - 2 * ${sliderPadding});
  transition: transform 350ms ease-in-out;
  transform: translateX(
    calc(${(props) => props.pageIdx} * (var(--space-between) - 100%))
  );
`;

const PlaylistartContainerPadding = styled.div`
  min-width: calc(var(--space-between) / 2);
  flex: 0 0;
`;

const PlaylistartScrollWrapper = styled.span`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: fit-content;
  margin-bottom: 0.25em;

  ${(props) => {
    if (props.hover)
      return css`
        & ~ ${PlaylistartText} {
          color: #fff;
        }
      `;
  }}
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
