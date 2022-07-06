import React, { useContext, useState, useEffect } from "react";

const LoginContext = React.createContext();

const CLIENT_ID = "2efe8449eedb4392b50cf2b4a454e695";
const SCOPE = "playlist-read-private user-library-read";
const REDIRECT_URI = window.location.origin;
const STATE = generateRandomString(16);
const SHOW_DIALOG = false;

export function useLogin() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  window.sessionStorage.setItem("state", STATE);

  const url =
    "https://accounts.spotify.com/authorize" +
    "?response_type=token" +
    ("&client_id=" + encodeURIComponent(CLIENT_ID)) +
    ("&scope=" + encodeURIComponent(SCOPE)) +
    ("&redirect_uri=" + encodeURIComponent(REDIRECT_URI)) +
    ("&state=" + encodeURIComponent(STATE)) +
    ("&show_dialog=" + encodeURIComponent(SHOW_DIALOG));

  const [token, setToken] = useState("");

  const checkTokenValidity = () => {
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
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("tokenExpiry");
    window.localStorage.removeItem("token");
  };

  const val = {
    loggedIn: token && token !== "",
    url: url,
    logout: logout,
  };

  return <LoginContext.Provider value={val}>{children}</LoginContext.Provider>;
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
