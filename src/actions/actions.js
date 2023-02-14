//These actions are an example and not in use on the site
//Actions variation types
export const LOGIN = 'LOGIN';
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';
export const GET_DIRECTOR = 'GET_DIRECTOR';
export const GET_GENRE = 'GET_GENRE';
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';
export const SET_FILTER = 'SET_FILTER'



//Add actions
export function login(value) {
    return {
        type: LOGIN,
        value
    }
};

export function setUser(value) {
    return {
        type: SET_USER,
        value
    }
}

export function logout(value) {
    return {
        type: LOGOUT,
        value
    }
};

export function signup(value) {
    return {
        type: SIGNUP,
        value
    }
};

export function updateUser(value) {
    return {
        type: UPDATE_USER,
        value
    }
};

export function deleteUser(value) {
    return {
        type: DELETE_USER,
        value
    }
};


export function getMovies(value) {
    return {
        type: GET_MOVIES,
        value
    }
};

export function getMovie(value) {
    return {
        type: GET_MOVIE,
        value
    }
};


export function getDirector(value) {
    return {
        type: GET_DIRECTOR,
        value
    }
};

export function getGenre(value) {
    return {
        type: GET_GENRE,
        value
    }
};

export function addFav(value) {
    return {
        type: ADD_FAV,
        value
    }
};

export function removeFav(value) {
    return {
        type: REMOVE_FAV,
        value
    }
};

export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    }
}