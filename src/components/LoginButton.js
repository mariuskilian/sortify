import { useLogin } from "../contexts/LoginContext";

export function LoginButton() {
  const login = useLogin();

  return (
    <>
      {!login.loggedIn ? (
        <a href={login.url}>Login to Spotify</a>
      ) : (
        <button onClick={login.logout}>Logout</button>
      )}
    </>
  );
}
