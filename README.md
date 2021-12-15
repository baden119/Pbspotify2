# PBSpotify

PBSpotify creates Spotify playlists based on the track lists of shows broadcast on PBS 106.7FM, a community radio station in Melbourne, Australia.
To achieve this the app interacts with two different APIs. [The first](https://airnet.org.au/rest/stations/3pbs/programs 'Airnet Rest API') provides JSON data about PBSFM including information about particular PBSFM shows, and track lists for each episode of a show which are provided weekly by the PBSFM DJ. The second API is the Spotify Web API through which Spotify provides functionality for one of their users to authorise a third party app like this one to create and make changes to one of their playlists.

# Frontend

https://pbspotify.netlify.app/

I decided to use React for this project as I thought the ability to separate parts of the app into components and to hold data in state would make interacting with the two APIs more manageable. After looking at some introductory YouTube videos about React I decided to take an additional course from Udemy ['Brad Traversy - React front to Back'](https://www.udemy.com/course/modern-react-front-to-back/ 'Brad Traversy - React front to Back') which covered using [Create React App](https://github.com/facebook/create-react-app 'Create React App on Github'), organising functional components, using Context Hooks for global state management and hosting a React project on Netlify.

To make a Spotify playlist the app begins by creating an array of Song.js objects with data from the PBSFM API. Once a user has logged into their Spotify account they can perform a Spotify Search which loops through this array and sends a track search request to the Spotify API for each song. Currently this process occasionally returns a series of http errors (429 Too Many Requests). If successful the search will return a Spotify Track ID for each song. These Track ID's are used to create the Spotify playlist.

# API

https://bitonio.herokuapp.com/

I created separate Django API to provide some back-end functionality for the React front-end, primarily implementing the Spotify Web API ['authorisation code flow'](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/ 'Spotify developer guide'), a complicated process of requests and page redirects which I was able to navigate after watching another YouTube tutorial ['Tech with Tim - Django & React Tutorial #13 - Spotify API Tutorial (Authentication & Tokens)'](https://www.youtube.com/watch?v=rYDDWVuv-kI 'Tech with Tim'). In order to fufil the CS50web Final Project requirements I also created a model which keeps track of the total number of songs added to playlists by everyone who uses the app. This data is displayed on the About page of the app.

# Distinctiveness and Complexity

Redo this section. Reduce everything.

In terms of complexity, the app is as complex as it has to be to answer the question and fulfil the course requirements. I feel like it probably leans towards being 'too complex' rather than 'not complex enough'. The Spotify login and 'authorisation code flow' process, for instance, was vastly more difficult and complicated than I anticipated, but figuring it out was necessary, nevertheless.
