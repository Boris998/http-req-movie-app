import React, {useState} from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

    const [isMouseOver, setIsMouseOver] = useState(false);

    const mouseOverHandler = () => {
        setIsMouseOver(true);
    }

    const mouseOutHandler = () => {
        setIsMouseOver(false);
    }

    return (
        <li className={classes.movie} onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
            <h2>{props.title}</h2>
            <h3>{props.releaseDate}</h3>
            <p>{props.openingText}</p>
            {isMouseOver &&
                <div>
                    <p>{props.producer}</p>
                    <p>{props.director}</p>
                </div>
            }
        </li>
    );
};

export default Movie;
