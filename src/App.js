import React, {useCallback, useEffect, useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from "./components/AddMovie";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        //default req is GET
        //fetch returns a promise(obj)
        try {
            const response = await fetch('https://react-http-6fb98-default-rtdb.firebaseio.com/movies.json');
            if (!response.ok) {
                throw new Error('sth went wrong');
            }

            const data = await response.json();
            const loadedMovies = [];

            for (const key in data) {
                loadedMovies.push({
                    id:key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate,
                    producer: data[key].producer,
                    director: data[key].director,
                });
            }

            setMovies(loadedMovies);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    const addMovieHandler = async (movie) => {
        console.log(movie);
        const response = await fetch('https://react-http-6fb98-default-rtdb.firebaseio.com/movies.json', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
    }

    return (
        <React.Fragment>
            <section>
                <AddMovie onAddMovie={addMovieHandler}/>
            </section>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}
                {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
                {isLoading && <p>Loading...</p>}
                {!isLoading && error && <p>{error}</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
