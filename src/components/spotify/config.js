// Taken from:
// https://github.com/atharvadeosthale/spotify-clone/blob/master/src/spotify.js

export const authEndpoint = "https://accounts.spotify.com/authorize";
let clientId;
let redirectUri; 

if (process.env.NODE_ENV !== 'production'){
  redirectUri = `http://localhost:3000/`;
  clientId = "33a2bac1ec3649429a5db59eac210602";
}else{
  redirectUri = 'https://pbspotify.netlify.app/';
  clientId = "33a2bac1ec3649429a5db59eac210602";
}

const scopes = [
  "user-read-private",
  "playlist-modify-private"
];

export const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token`;