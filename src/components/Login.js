import { useEffect, useState } from "react";

export function Login() {
  const CLIENT_ID = "2efe8449eedb4392b50cf2b4a454e695";
  const SCOPE = "";
  const REDIRECT_URI = "http://localhost:3000";
  const STATE = generateRandomString(16);
  const SHOW_DIALOG = true;

  window.sessionStorage.setItem("state", STATE);

  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(CLIENT_ID);
  url += "&scope=" + encodeURIComponent(SCOPE);
  url += "&redirect_uri=" + encodeURIComponent(REDIRECT_URI);
  url += "&state=" + encodeURIComponent(STATE);
  url += "&show_dialog=" + encodeURIComponent(SHOW_DIALOG);

  const [token, setToken] = useState("");

  useEffect(() => {
    // Check if an existing token has expired. If yes log out.
    let tokenExpiry = window.localStorage.getItem("tokenExpiry");
    if (tokenExpiry && new Date().getTime() / 1000 > tokenExpiry) logout();

    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      const hashData = hash.substring(1).split("&");
      const hashState = hashData
        .find((elem) => elem.startsWith("state"))
        .split("=")[1];
      // TODO: hashState === window.sessionStorage.getItem("state"))
      if (true) {
        token = hashData
          .find((elem) => elem.startsWith("access_token"))
          .split("=")[1];
        const expiresIn = hashData
          .find((elem) => elem.startsWith("expires_in"))
          .split("=")[1];
        tokenExpiry = new Date().getTime() / 1000 + parseInt(expiresIn);
      }

      window.location.hash = "";
      window.localStorage.setItem("tokenExpiry", tokenExpiry);
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("tokenExpiry");
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      {!token ? (
        <a href={url}>Login to Spotify</a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
}

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
