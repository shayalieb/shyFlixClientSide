import './movie-view.scss'

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img className='w-100' src={movie.imagepath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director}</span>
            </div>
            <br>
            </br>
            <button className='back-button' onClick={onBackClick}>Back</button>
        </div>
    );
};