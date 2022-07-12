import { PasseSongsFilter } from "../components/PasseSongsFilter";
import { PlaylistBox } from "../components/PlaylistBox";
import { useData } from "../contexts/DataContext";
import { useState } from "react";

const VIEWS = {
  Playlist: "PLAYLIST_VIEW",
  AllSongs: "ALLSONGS_VIEW",
};

export function Cleanup() {
  const [view, setView] = useState(VIEWS.Playlist);

  const data = useData();

  function switchView() {
    switch (view) {
      case VIEWS.Playlist:
        setView(VIEWS.AllSongs);
        break;
      case VIEWS.AllSongs:
        setView(VIEWS.Playlist);
        break;
      default:
        break;
    }
  }

  function getAllSongs() {
    let merged = [];
    data.playlists?.forEach(
      (playlist) => (merged = merged.concat(playlist.tracks))
    );
    // Remove duplicates
    merged = merged.filter((track, i) => {
      for (let j = 0; j < i; j++) {
        if (track.info.id === merged[j].info.id) return false;
      }
      return true;
    });
    return merged;
  }

  return (
    <>
      <h1>Cleanup</h1>
      {!data.isLoading && (
        <button onClick={() => switchView()}>switch view</button>
      )}
      {view === VIEWS.Playlist && <PasseSongsFilter />}
      {view === VIEWS.AllSongs && <PlaylistBox tracklist={getAllSongs()} />}
    </>
  );
}
