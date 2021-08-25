const Song = (new_id, track, artist, date) => {

    const id = new_id;            
    const pbs_track = track;
    const pbs_artist = artist;
    const pbs_date = date;

    const searchSpotify = async (API) => {
        try {
            const res = await API.searchTracks((pbs_track + " " + pbs_artist), { limit: 1 });
            if (res.tracks.items[0]) {
                let spotify_track = res.tracks.items[0].name;
                let spotify_artist = res.tracks.items[0].artists[0].name;
                let spotify_URI = res.tracks.items[0].uri
                let spotify_match_found = true;
                let exclude_result = false;

                return { 
                    id, 
                    pbs_track, 
                    pbs_artist, 
                    pbs_date, 
                    spotify_track,
                    spotify_artist,
                    spotify_URI,
                    spotify_match_found,
                    exclude_result,
                    searchSpotify,
                    advancedSearchSpotify
                }
            } else { return false }
        } catch (e) {
            console.error(e);
        }
    }

    const advancedSearchSpotify = async (API) => {

        const stripString = (string) =>{

            if (string === null){
              return "";
            }
            string=string.split('-')[0]
            string=string.split('(')[0]
            string=string.split('+')[0]
            string=string.split('[')[0]
            string=string.split('&')[0]
            string=string.split('ft.')[0]
            string=string.split('feat.')[0]
            string=string.split('feat')[0]
            string=string.split('FT')[0]
            string=string.split('Ft.')[0]
            
            // Just remove dont cut rest of string.
            // string=string.split('|')[0]
            return string;
        };

        let strippedTrack = stripString(pbs_track);
        let strippedArtist = stripString(pbs_artist);

        try {
            const res = await API.searchTracks((strippedTrack + " " + strippedArtist), { limit: 1 });
            if (res.tracks.items[0]) {
                let spotify_track = res.tracks.items[0].name;
                let spotify_artist = res.tracks.items[0].artists[0].name;
                let spotify_URI = res.tracks.items[0].uri
                let spotify_match_found = true;
                let exclude_result = false;
                return { 
                    id, 
                    pbs_track, 
                    pbs_artist, 
                    pbs_date, 
                    spotify_track,
                    spotify_artist,
                    spotify_URI,
                    spotify_match_found,
                    exclude_result,
                    searchSpotify,
                    advancedSearchSpotify
                }
            } else { return false }
        } catch (e) {
            console.error(e);
        }
    }

    return { 
        id, 
        pbs_track, 
        pbs_artist, 
        pbs_date, 
        searchSpotify, 
        advancedSearchSpotify
    };
}

export default Song