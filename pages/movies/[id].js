import React, { Fragment } from 'react';
import client from '../../client';

import Hero from '../../components/Hero';
import { MOVIE_URL } from '../../utils/constants';
import { backdrop, poster } from '../../utils/helpers';
import Detail from '../../components/Detail';
import Comment from '../../components/Comment';

const Movies = ({ item, directors, cast }) => (
    <Fragment>
        <Hero
            title={item.title}
            description={item.overview}
            genres={(item.genres || []).map(element => element.name).join(', ')}
            certificate="18"
            imageUrl={backdrop(item.backdrop_path)}
            trailerUrl="https://youtu.be/ScMzIvxBSi4"
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
        <Comment />
    </Fragment>
);

Movies.getInitialProps = async ({ query }) => {
    const { id } = query;
    const { data } = await client.get(`${MOVIE_URL}/${id}`);
    const credits = await client.get(`${MOVIE_URL}/${id}/credits`);
    const { crew, cast } = credits.data;
    return {
        item: data,
        directors: crew.filter(item => item.job === 'Director').map(item => item.name),
        cast: cast.map(item => item.name),
    }
};

export default Movies;
