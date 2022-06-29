import { PlaylistBox } from "../components/PlaylistBox";

export function Cleanup(props) {
  return (
    <>
      <h1>Cleanup</h1>
      {!props.playlists && <p>Loading...</p>}
      {props.playlists?.map((playlist, i) => {
        return <PlaylistBox key={i} playlist={playlist} />;
      })}
    </>
  );
}
