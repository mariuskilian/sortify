import React from "react";

export class ReceivePlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      numPlaylists: -1,
      likedSongs: [],
      allPlaylists: [],
    };
  }

  DisplaySongs() {
    return <div>{this?.state.allPlaylists.length}</div>;
  }

  render() {
    return <></>;
  }
}
