import { PlaylistScroller } from "../components/PlaylistScroller";
import { useData } from "../contexts/DataContext";

export function ListenLater() {
  const songId = "3kyW3qviTr2dIyvqa1lEWC";

  const data = useData();

  return (
    <>
      {!data.isLoading && (
        <div style={{ width: 600 + "px", margin: 2 + "em" }}>
          <PlaylistScroller songid={songId} />
        </div>
      )}
    </>
  );
}
