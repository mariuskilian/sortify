import axios from "axios";
import { useEffect, useState } from "react";

export function FilterPasseSongs() {
  const HEADERS = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  const [userId, setUserId] = useState("");
  const [allPlaylists, setAllPlaylists] = useState([]);

  // Run Filter
  useEffect(() => {
    if (userId !== "") getAllPlaylists();
  }, [userId]);

  async function getUserProfile() {
    // Get the user ID. Used to determine which playlists are owned by the user
    const { data: profile } = await axios.get("https://api.spotify.com/v1/me", {
      headers: HEADERS,
    });
    setUserId(profile.id);
  }

  async function getAllPlaylists() {
    // Get list of playlist IDs
    let playlistsList = [];
    const limit = 50;
    let offset = 0;
    let numPlaylists = -1;
    do {
      const { data: _playlistsList } = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        { headers: HEADERS, params: { limit: limit, offset: offset } }
      );
      playlistsList = playlistsList.concat(_playlistsList.items);
      if (numPlaylists === -1) numPlaylists = _playlistsList.total;
      offset += limit;
    } while (offset < numPlaylists);

    // For each playlist, get the playlist info as well as track list and
    // combine then into one playlist item
    for (var i = 0; i < playlistsList.length; i++) {
      // Get the playlist info
      const fields = "collaborative,id,images,name,owner(id,display_name)";
      const { data: playlistInfo } = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistsList[i].id}`,
        { headers: HEADERS, params: { fields: fields } }
      );
      let playlistTracks = [];
      const numTracks = playlistsList[i].tracks.total;
      const limit = 100;
      let offset = 0;
      while (offset < numTracks) {
        const { data: _playlistTracks } = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistsList[i].id}/tracks`,
          {
            headers: HEADERS,
            params: { limit: limit, offset: offset, fields: "items" },
          }
        );
        playlistTracks = playlistTracks.concat(_playlistTracks.items);
        offset += limit;
      }
      let playlist = playlistInfo;
      playlist.tracks = playlistTracks;
      updatePlaylistCollabStatus(playlist);
      setAllPlaylists(allPlaylists.concat(playlist));
    }
  }

  // Since Spotify API returns `collaborative=false` for all playlists, this
  // pseudo-checks for collaboration by checking if anyone other than the owner
  // added a song to the playlist, which should be good enough.
  // This function then also checks whether the current user has added a song to
  // this playlist and checks a userCollabed boolean accordingly.
  function updatePlaylistCollabStatus(playlist) {
    const ownerId = playlist.owner.id;
    let collaborative = false;
    let userCollabed = false;
    for (let i = 0; i < playlist.tracks.length; i++) {
      const addedById = playlist.tracks[i].added_by.id;
      collaborative = collaborative || addedById !== ownerId;
      userCollabed = userCollabed || addedById === userId;
      if (collaborative && userCollabed) break;
    }
    playlist.collaborative = collaborative;
    playlist.userCollabed = userCollabed;
  }

  return (
    <button
      onClick={() => {
        getUserProfile();
      }}
    >
      click me
    </button>
  );
}
