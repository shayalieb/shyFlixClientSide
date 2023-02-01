import { createRoot } from 'react-dom/client'
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
//Import redux dependencies

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import background from '../img/background-image.jpg';

const App = () => {
    return (
        <div className='background-img' style={{backgroundImage: `url(${background})`,
        }}>
            <Container> 
           
                <MainView />
              
            </Container>
            </div>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
