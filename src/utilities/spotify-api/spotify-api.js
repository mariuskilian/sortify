import { request, aggrRequest } from "./api-requests";

const PL_FIELDS = "collaborative,id,images,name,owner(id,display_name)";

export async function getUserProfile() {
  return await request("/me");
}

export async function getLikedSongs() {
  let result = await aggrRequest("/me/tracks", { limit: 50 });
  result.data.forEach((track) => renameTrackInfo(track));
  return result;
}

export async function getPlaylists(userId) {
  let status;
  // Get the list of playlists owned by the user
  const playlistsList = await aggrRequest("/me/playlists", {
    limit: 50,
  }).then(({ status: _status, data: items }) => {
    status = _status;
    items = items.filter((pl) => pl.owner.id === userId);
    return items;
  });
  // Get each playlists info and items and combine them into one object
  return Promise.all(
    playlistsList.map(async (pl) => {
      // Get playlist info
      const { status: plInfoStatus, data: plInfo } = await request(
        `/playlists/${pl.id}`,
        { fields: PL_FIELDS }
      );
      status = plInfoStatus;
      // Get playlist tracks
      const { status: plTracksStatus, data: plTracks } = await aggrRequest(
        `/playlists/${pl.id}/tracks`,
        { limit: 100, fields: "items,limit,offset,total" }
      );
      status = plTracksStatus;
      // Combine into one object
      let playlist = plInfo;
      playlist.tracks = plTracks;
      // Nest all playlist info into 'info' key to separate info and tracks
      playlist = Object.assign({}, { info: playlist, tracks: playlist.tracks });
      delete playlist.info.tracks;

      playlist.tracks.forEach((track) => renameTrackInfo(track));
      return playlist;
    })
  ).then((playlists) => {
    return { status, data: playlists };
  });
}

// Rename nested key 'track' to 'info' for more clarity
function renameTrackInfo(track) {
  delete Object.assign(track, { info: track.track }).track;
}
