import { PlaylistScroller } from "../components/PlaylistScroller";
import { PlaylistScrollerCalculator } from "../components/PlaylistScrollerCalculator";
import { useData } from "../contexts/DataContext";

export function ListenLater() {
  const songId = "3kyW3qviTr2dIyvqa1lEWC";

  const data = useData();

  return (
    <>
      <PlaylistScrollerCalculator />
      {!data.isLoading && (
        <div style={{ flexGrow: 1, margin: 2 + "em" }}>
          <PlaylistScroller songid={songId} />
        </div>
      )}
    </>
  );
}
