import React, { Fragment, useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import client from '../client';

import { MOVIE_URL } from '../utils/constants';
import Loader from '../components/Loader';
import Carousel from '../components/Carousel';
import MovieList from '../components/MovieList';
import Title from '../components/Title';
import Poster from '../components/Poster';
import CarouselItem from '../components/CarouselItem';
import { backdrop, poster } from '../utils/helpers';
import LoadMore from "../components/LoadMore";

const Home = ({ carousels, movies }) => {
    const [mores, setMores] = useState(movies);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMoreItems = async () => {
        try {
            const { data } = await client.get(MOVIE_URL, { params: { page } });
            const { results, total_pages } = data;
            setMores([ ...mores, ...results ]);
            setHasMore(page !== total_pages);
            setLoading(true);
            setPage(page + 1);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Carousel>
                {carousels.map((item, index) => (
                    <CarouselItem
                        active={index === 0}
                        key={`carousel-${index}`}
                        title={item.original_title}
                        description={item.overview}
                        genres={item.genre_ids.join(', ')}
                        imageUrl={backdrop(item.backdrop_path)}
                    />
                ))}
            </Carousel>
            <MovieList>
                <Title>New In</Title>
                {mores.map((item, index) => (
                    <Poster
                        key={`movie-${index}`}
                        title={item.title}
                        imageUrl={poster(item.poster_path)}
                        releaseDate={item.release_date}
                    />
                ))}
                {(hasMore && !loading) && <LoadMore onClick={handleLoadMoreItems} />}
                {loading && <Loader key={0} type={<SyncLoader color="#E76115" />} />}
            </MovieList>
        </Fragment>
    );
};

Home.getInitialProps = async () => {
    const { data } = await client.get(MOVIE_URL, { params: { page: 1 } });
    const { results } = data;
    return { carousels: results.slice(0, 3), movies: results };
};

export default Home;
