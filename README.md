# shyFlixClientSide
 shyFlix app Client side

 The main goal of the shyFlix Movie app is to help users keep track of things related to movies.
 For example:
    .Create favorite movie list
    .Have the ability to add and delete movie from your favorites
    .Filter by Genre, and Director

How it works:
    .When a user is signed up the user will login
    .Once logged in, the user can view all the latest movies
    .Add to favorites
    .Remove favorites
    .Update profile
    .Delete profile
    .Search/filter by genre and director

How the app is built:
Server side;
    Node.js - server language 
    Express - framework for building this api   
    Passport - for authentication
    MongoDB - The database location where the server can make requests

Client side (this project)
    React JSX is the language which allows for writing HTM in React JSX
    React Bootstrap for styling 
    React Router for navigating this app     

The various view in the one page application
    SingupView
    LoginView
    MovieCard
    MovieView
    ProfileView   
    MainView where the above view will live
    index.jsx where the rendering will take place 

    Navigation:
        .onLoggedOut - LoginView, SignupView
        .onLoggedIn - MovieCard, MovieView, ProfileView
        .onLoggedIn - Search filter by movieName, movieGenre, movieDirector

Resources:     
React bootstrap for styling   
https://react-bootstrap.github.io/getting-started/introduction

Redux for keeping track of the state of the various components and views
https://redux.js.org/




