//Actions variation types
export const LOGIN = 'LOGIN';
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
export function LOGIN(value) {
    return {
        type: LOGIN,
        value
    }
};

export function LOGOUT(value) {
    return {
        type: LOGOUT,
        value
    }
};

export function SIGNUP(value) {
    return {
        type: SIGNUP,
        value
    }
};

export function UPDATE_USER(value) {
    return {
        type: UPDATE_USER,
        value
    }
};

export function DELETE_USER(value) {
    return {
        type: DELETE_USER,
        value
    }
};

export function UPDATE_USER(value) {
    return {
        type: UPDATE_USER,
        value
    }
};

export function GET_MOVIE(value) {
    return {
        type: GET_MOVIE,
        value
    }
};

export function GET_MOVIES(value) {
    return {
        type: GET_MOVIES,
        value
    }
};


export function GET_DIRECTOR(value) {
    return {
        type: GET_DIRECTOR,
        value
    }
};

export function GET_GENRE(value) {
    return {
        type: GET_GENRE,
        value
    }
};

export function ADD_FAV(value) {
    return {
        type: ADD_FAV,
        value
    }
};

export function REMOVE_FAV(value) {
    return {
        type: REMOVE_FAV,
        value
    }
};

export function SET_FILTER(value) {
    return {
        type: SET_FILTER,
        value
    }
}