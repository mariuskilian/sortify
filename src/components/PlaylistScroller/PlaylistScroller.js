import "./PlaylistScroller.css";
import { useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { usePropertyValue, getPropertyValue } from "../../hooks/propertyValue";
import { mod } from "../../utilities/math-util";

export function PlaylistScroller(props) {
  const data = useData();

  const playlistScrollerRef = useRef();
  const [pageIdx, setPageIdx] = usePropertyValue(
    "--page-index",
    playlistScrollerRef
  );
  const numItemsPage = getPropertyValue("--num-items-per-page");

  let containedPlaylistIndices = [];
  data.playlists.forEach((playlist, i) => {
    if (playlist.tracks.map((t) => t.info.id).includes(props.songid))
      containedPlaylistIndices.push(i);
  });

  const numItems = containedPlaylistIndices.length;
  const numPages = Math.ceil(numItems / numItemsPage);

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
    <div className="playlist-scroller" ref={playlistScrollerRef}>
      {numPages > 1 && (
        <span className="page-indicator">
          {Array.apply(null, new Array(numPages)).map((_, i) => (
            <div
              key={`pi_${i}`}
              className={`${i}` === pageIdx ? "active" : ""}
            ></div>
          ))}
        </span>
      )}
      <span
        className="playlistart-scroll-wrapper container"
        onMouseLeave={() => resetHoveredPlaylist()}
      >
        {numPages > 1 && (
          <button className="scroll-btn scroll-left" onClick={scrollLeft}>
            {"<"}
          </button>
        )}
        <span className="playlistart-container slider">
          {containedPlaylistIndices.map((plIdx) => (
            <img
              key={data.playlists[plIdx].info.id}
              className="playlistart"
              src={data.playlists[plIdx].info.images[1]?.url}
              alt={data.playlists[plIdx].info.name}
              onMouseEnter={() => updateHoveredPlaylist(plIdx)}
            />
          ))}
        </span>
        {numPages > 1 && (
          <button className="scroll-btn scroll-right" onClick={scrollRight}>
            {">"}
          </button>
        )}
      </span>
      <div className="playlistart-text">{hoveredPlaylist}</div>
    </div>
  );
}
