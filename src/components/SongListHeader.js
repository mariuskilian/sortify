import styled, { css } from "styled-components";

export function SongListHeader() {
  return (
    <HeaderWrapper>
      <SongListHeaderDiv>
        <SongIndexHeader>#</SongIndexHeader>
        <SongInfoHeader>
          <SongnameArtistHeader>TITLE/ARTISTS</SongnameArtistHeader>
          <AlbumHeader>ALBUM</AlbumHeader>
          <SonglengthHeader>TIME</SonglengthHeader>
          <ContextMenuHeader />
        </SongInfoHeader>
      </SongListHeaderDiv>
    </HeaderWrapper>
  );
}

//#region Styles
const spaceOnRight = css`
  margin-right: 1rem;
`;

const noTextOverflow = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const HeaderWrapper = styled.div`
  background-color: #282828;
  box-shadow: 0 1px #555555;
  z-index: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem 0.25rem 0 0;
`;

const SongListHeaderDiv = styled.div`
  color: #aaa;
  flex-grow: 1;
  display: flex;
  padding: 0 1.5rem;
`;

const SongInfoHeader = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  margin-left: 3.5rem;
`;

const ContextMenuHeader = styled.div`
  width: 0.5rem;
`;

const SongIndexHeader = styled.div`
  ${spaceOnRight}
  ${noTextOverflow};
  position: relative;
  width: 1rem;
`;

const SongnameArtistHeader = styled.div`
  ${spaceOnRight}
  ${noTextOverflow};
  width: 65%;
`;

const AlbumHeader = styled.div`
  ${spaceOnRight}
  ${noTextOverflow};
  width: 35%;
`;

const SonglengthHeader = styled.div`
  ${spaceOnRight}
  width: 4rem;
`;
//#endregion
