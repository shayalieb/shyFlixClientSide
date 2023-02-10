import { createRoot } from 'react-dom/client'
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
//Import redux dependencies
import { store } from './redux/store';
import { Provider } from 'react-redux';
import {
    login, logout,
    signup, updateUser,
    deleteUser, getMovies,
    getMovie, getDirector, getGenre,
    addFav, removeFav, setFilter,
}
    from '../src/actions/actions'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import background from '../img/background-image.jpg';

// store.dispatch(login(setUser))
// store.dispatch(logout(value))
// store.dispatch(signup(value))
// store.dispatch(updateUser(value))
// store.dispatch(deleteUser(value))
// store.dispatch(getMovies(value))
// store.dispatch(getMovie(value))
// store.dispatch(getDirector(value))
// store.dispatch(getGenre(value))
// store.dispatch(addFav(value))
// store.dispatch(removeFav(value))
// store.dispatch(setFilter(value))


const App = () => {
    return (
        <Provider store={store}>
            <div className='background-img' style={{
                backgroundImage: `url(${background})`,
            }}>
                <Container>

                    <MainView />

                </Container>
            </div>
        </Provider>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
