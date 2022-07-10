import { PlaylistScroller } from "./PlaylistScroller";
import styled from "styled-components";

export function Song(props) {
  const songinfo = props.info;

  //#region JSX
  return (
    <SongBanner className={props.selectionClasses}>
      <SongIndex>{props.index + 1}</SongIndex>
      <AlbumArt src={songinfo.albumart} alt="" />
      <SonginfoContent>
        <SongnameArtistWrapper>
          <Songname>{songinfo.songname}</Songname>
          <ArtistAlbum>
            {`${songinfo.artists.join([", "])} \u2022 ${songinfo.album}`}
          </ArtistAlbum>
        </SongnameArtistWrapper>
        <PlaylistScrollerWrapper>
          <PlaylistScroller songid={songinfo.id} />
        </PlaylistScrollerWrapper>
      </SonginfoContent>
      <ContextMenu>.</ContextMenu>
    </SongBanner>
  );
  //#endregion
}

//#region Styles
const SongIndex = styled.div`
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 0;
  text-align: right;
  width: 3em;
`;

const AlbumArt = styled.img`
  height: 4em;
  width: 4em;
`;

const Songname = styled.div`
  font-weight: bold;
  margin-bottom: 0.25em;
`;

const ArtistAlbum = styled.div``;

const SongnameArtistWrapper = styled.div`
  width: 30%;
`;

const PlaylistScrollerWrapper = styled.div`
  width: 70%;
`;

const ContextMenu = styled.div`
  width: 0.5em;
  color: #999;
  visibility: hidden;
`;

const SonginfoContent = styled.div`
  display: flex;
  width: 100%;
`;

const SongBanner = styled.div`
  width: inherit;
  background-color: #222;
  display: flex;
  padding: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.35em;

  &:hover {
    background-color: #444;

    & ${ContextMenu} {
      visibility: visible;
    }

    & ${ArtistAlbum} {
      color: #fff;
    }
  }

  &.selected {
    background-color: #666;
    :not(.first-select, .last-select) {
      border-radius: 0;
    }
    :not(.last-select) {
      box-shadow: 0 15px #666;
    }

    ${ArtistAlbum}, ${SongIndex} {
      color: #fff;
    }
  }

  ${SongIndex}, ${AlbumArt}, ${SongnameArtistWrapper}, ${SonginfoContent} {
    margin-right: 1em;
  }

  ${Songname}, ${ArtistAlbum} {
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${SongIndex}, ${ArtistAlbum} {
    color: #aaa;
  }

  ${SongIndex}, ${SongnameArtistWrapper}, ${AlbumArt} {
    margin-top: auto;
    margin-bottom: auto;
  }
`;
//#endregion
