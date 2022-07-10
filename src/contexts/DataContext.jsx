import React, { useContext, useState, useEffect } from "react";
import {
  getUserProfile,
  getLikedSongs,
  getPlaylists,
} from "../utilities/spotify-api";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  async function initApiState(setState, msg, get, ...params) {
    await get(...params).then(({ status, data }) => {
      console.log(msg + " initialization; Status code: " + status);
      if (status === 200) setState(data);
    });
  }

  useEffect(() => {
    initApiState(setUserProfile, "User Profile", getUserProfile);
    initApiState(setLikedSongs, "Liked Songs", getLikedSongs);
  }, []);

  useEffect(() => {
    if (!playlists && userProfile) {
      initApiState(setPlaylists, "Playlists", getPlaylists, userProfile.id);
    }
  }, [userProfile, likedSongs, playlists]);

  const val = {
    isLoading: !userProfile || !likedSongs || !playlists,
    userProfile: userProfile,
    likedSongs: likedSongs,
    playlists: playlists,
  };

  return <DataContext.Provider value={val}>{children}</DataContext.Provider>;
}
