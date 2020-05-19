import React, { Fragment } from 'react';
import imdb from '../../client/imdb';

import Hero from '../../components/Hero';
import {MOVIE_PARAM, MOVIE_URL} from '../../utils/constants';
import { backdrop, poster, youtube } from '../../utils/helpers';
import Detail from '../../components/Detail';

const Movies = ({ item, directors, cast, trailer }) => (
    <Fragment>
        <Hero
            title={item.title}
            description={item.overview}
            genres={(item.genres || []).map(element => element.name).join(', ')}
            certificate="18"
            imageUrl={backdrop(item.backdrop_path)}
            trailerUrl={youtube(trailer)}
        />
        <Detail
            title={item.title}
            description={item.overview}
            directors={directors.join(', ')}
            cast={cast.join(', ')}
            duration={item.runtime}
            releaseDate={item.release_date}
            imageUrl={poster(item.poster_path)}
        />
    </Fragment>
);

Movies.getInitialProps = async ({ query }) => {
    const { id } = query;
    const { data } = await imdb.get(`${MOVIE_URL}/${id}`, { params: MOVIE_PARAM });
    const { videos, credits } = data;
    const { results } = videos;
    const youtube = results.map(item => item.key);
    const { crew, cast } = credits;
    return {
        item: data,
        directors: crew.filter(item => item.job === 'Director').map(item => item.name),
        cast: cast.map(item => item.name),
        trailer: (youtube || []).shift(),
        trailers: youtube,
    }
};

export default Movies;
