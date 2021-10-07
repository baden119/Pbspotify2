const deploy = true;

export const apiURL = () => {
  if (deploy){
    return 'https://bitonio.herokuapp.com'
  } else return 'http://127.0.0.1:8000'
}

export const homeURL = () => {
  if (deploy) {
    return 'https://pbspotify.netlify.app'
  } else return 'http://localhost:3000'
  
}