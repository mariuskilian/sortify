import { useData } from "../contexts/DataContext";
import { PlaylistBox } from "./PlaylistBox";

export function PasseSongsFilter() {
  const data = useData();

  if (data.isLoading) return <h3>Loading...</h3>;

  return data.playlists.map((playlist) => {
    const filteredTracks = playlist.tracks.filter(
      (track) => !data.likedSongs.map((t) => t.info.id).includes(track.info.id)
    );
    return (
      <span key={`box${playlist.info.id}`}>
        {filteredTracks.length === 0 || (
          <PlaylistBox
            key={`box${playlist.info.id}`}
            playlistInfo={playlist.info}
            tracklist={filteredTracks}
          />
        )}
      </span>
    );
  });
}
