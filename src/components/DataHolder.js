import {
  getUserProfile,
  getLikedSongs,
  getPlaylists,
} from "../utilities/spotify-api";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Cleanup, ListenLater, Snapshots } from "../pages";

export function DataHolder(state) {
  const [userProfile, setUserProfile] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  async function initApiState(state, setState, msg, get, ...params) {
    if (state) return;
    await get(...params).then(({ status, data }) => {
      console.log(msg + " initialization; Status code: " + status);
      if (status === 200) setState(data);
    });
  }

  useEffect(() => {
    initApiState(userProfile, setUserProfile, "User Profile", getUserProfile);
    initApiState(likedSongs, setLikedSongs, "Liked Songs", getLikedSongs);
  }, []);

  useEffect(() => {
    if (userProfile && likedSongs && playlists) console.log("done");
    if (!playlists && userProfile) {
      initApiState(
        playlists,
        setPlaylists,
        "Playlists",
        getPlaylists,
        userProfile.id
      );
    }
  }, [userProfile, likedSongs, playlists]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cleanup" element={<Cleanup playlists={playlists} />} />
      <Route path="/listenlater" element={<ListenLater />} />
      <Route path="/snapshots" element={<Snapshots />} />
    </Routes>
  );
}
