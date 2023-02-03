import { combineReducers } from "@reduxjs/toolkit";

import {
    LOGIN, LOGOUT, SIGNUP, SET_USER,
    UPDATE_USER, DELETE_USER,
    GET_MOVIES, GET_MOVIE,
    ADD_FAV, REMOVE_FAV,
    SET_FILTER,
} from '../../actions/actions'

function login(state = '', action) {
    switch (action.type) {
        case LOGIN:
            return action.value || localStorage.getItem('user');
        default:
            return state;
    }
}

function setUser(state = '', action) {
    switch(action.type) {
        case SET_USER:
            return action.value || 
            localStorage.setItem('user'),
            localStorage.setItem('token')
        default:
            return state;
        }
}

function logout(state = '', action) {
    switch (action.type) {
        case LOGOUT:
            return action.value || 
                localStorage.clear(),
                localStorage.removeItem('token'),
                window.open('/', '_self');
        default:
            return state;
    }
}

function signup(state = '', action) {
    switch (action.type) {
        case SIGNUP:
            return action.value;
        default:
            return state;
    }
}

function updateUser(state = '', action) {
    switch (action.type) {
        case UPDATE_USER:
            return action.value || localStorage.setItem('user')
        default:
            return state;
    }
}

function deleteUser(state = '', action) {
    switch (action.type) {
        case DELETE_USER:
            return action.value || localStorage.removeItem('user')
        default:
            return state;
    }
}

function getMovies(state = [], action) {
    switch (action.type) {
        case GET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function getMovie(state = '', action) {
    switch (action.type) {
        case GET_MOVIE:
            return action.value;
        default:
            return state;
    }
}

function addFav(state = [], action) {
    switch (action.type) {
        case ADD_FAV:
            return action.value || localStorage.setItem('user')
        default:
            return state;
    }
}

function removeFav(state = [], action) {
    switch (action.type) {
        case REMOVE_FAV:
            return action.value || localStorage.removeItem('user')
        default:
            return state;
    }
}

function setFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
    login,
    setUser,
    logout,
    signup,
    updateUser,
    deleteUser,
    getMovies,
    getMovie,
    addFav,
    removeFav,
    setFilter
});

export default moviesApp;