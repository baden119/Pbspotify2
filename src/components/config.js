const deploy = false;

export const homeURL = () => {
  if (deploy) {
    return 'https://pbspotify.netlify.app/';
  } else return 'http://localhost:3000/';
};

export const scopes = [
  'user-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
];
