import React, {useRef} from 'react';

import classes from './AddMovie.module.css';
import {Grid} from "@mui/material";

function AddMovie(props) {
    const titleRef = useRef('');
    const openingTextRef = useRef('');
    const releaseDateRef = useRef('');
    const producerRef = useRef('');
    const directorRef = useRef('');

    function submitHandler(event) {
        event.preventDefault();

        // could add validation here...

        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value,
            producer: producerRef.current.value,
            director: directorRef.current.value,
        };

        props.onAddMovie(movie);
    }

    return (
        <form onSubmit={submitHandler}>
            <Grid className={classes.control}>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' ref={titleRef}/>
            </Grid>
            <Grid className={classes.control}>
                <label htmlFor='opening-text'>Opening Text</label>
                <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
            </Grid>
            <Grid className={classes.control}>
                <label htmlFor='date'>Release Date</label>
                <input type='date' id='date' ref={releaseDateRef}/>
            </Grid>
            <Grid container item xs={12} spacing={4}>
                <Grid item xs={6} className={classes.control}>
                    <label htmlFor='date'>Director</label>
                    <input type='text' id='director' ref={directorRef}/>
                </Grid>
                <Grid item xs={6} className={classes.control}>
                    <label htmlFor='date'>Producer</label>
                    <input type='text' id='producer' ref={producerRef}/>
                </Grid>
            </Grid>
            <button className={classes.control}>Add Movie</button>
        </form>
    );
}

export default AddMovie;
