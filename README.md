# [PBSpotify](https://pbspotify.netlify.app/ 'PBSpotify')

PBSpotify creates Spotify playlists based on the track lists of shows broadcast on PBS 106.7FM, a community radio station in Melbourne, Australia.

To achieve this the app interacts with two different external APIs. [The first](https://airnet.org.au/rest/stations/3pbs/programs 'Airnet Rest API') is a publically available Rest API which provides JSON data about PBSFM including information about particular PBSFM shows, and track lists for each episode of a show which are provided weekly by the PBSFM DJ. The second API is the Spotify Web API through which Spotify provides functionality for one of their users to authorise a third party app like this one to create and make changes to one of their playlists via thier [OAuth 2.0 service.](https://developer.spotify.com/documentation/web-api/tutorials/code-flow 'Spotify Authorization Code Flow')

The app is currently hosted online via netlify at [https://pbspotify.netlify.app/](https://pbspotify.netlify.app/ 'PBSpotify')
