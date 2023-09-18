# shyFlix Client Side

This app is the user interface that is bing powered by the shyFlix app that is hosted on Heroku https://shyflixapp.herokuapp.com/documentation
Design to allow users to login or sign up, view a list of movies, open a movie and view info about that movie, add or remove it from your favorite list of movies, and update or delete a users's profile.
App link: https://shyflixapp.netlify.app/

# App instructions

## Step 1 - 

The user comes to the home page with the ability to login, or sign up
![login](/img/home-screen.png)
![Sign up](/img/signup-screen.png)

## Step 2 

The user sees a list of movies with the ability to open up the one of the user's choice.
![movie card](/img/movie-card.png)

## Step 3

Once the user opens a movie they will see relevant info regarding that movie, and have the ability to add the movie to the user's favorite movies list.
![movie view](/img/movie-view.png)

## Step 4 

When the user clicks on profile view they will have the ability to view the favorite movies list, and add or remove movies from the favorite users list.
The user will also have the ability to update their profile or delete their account.
![profile view](/img/profile-view.png)


How the app is built:
Server side;
    Node.js - server language 
    Express - framework for building this api   
    Passport - for authentication
    MongoDB - The database location where the server can make requests

Client side (this project)
    React JSX is the language which allows for writing HTML in React JSX
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




