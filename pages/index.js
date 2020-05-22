import React, { Fragment, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { NotificationManager } from "react-notifications";
import { Row, Col } from "reactstrap";

import imdb from "../client/imdb";
import { MOVIE_PARAM, MOVIE_URL } from "../utils/constants";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";
import Title from "../components/Title";
import Poster from "../components/Poster";
import CarouselItem from "../components/CarouselItem";
import { backdrop, poster, youtube, getCertification } from "../utils/helpers";
import LoadMore from "../components/LoadMore";
import ScrollToTop from 'react-scroll-up';

const Home = ({ carousels, movies }) => {
  const [mores, setMores] = useState(movies);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreItems = async () => {
    try {
      const { data } = await imdb.get(`${MOVIE_URL}/popular`, {
        params: { page },
      });
      const { results, total_pages } = data;
      setMores([...mores, ...results]);
      setHasMore(page <= total_pages);
      setPage(page + 1);
    } catch (e) {
      NotificationManager.error("Can not load more movies");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreItems = () => {
    setLoading(true);
    setTimeout(async () => await loadMoreItems(), 500);
  };

  return (
    <Fragment>
      <Carousel>
        {carousels.map((item, index) => (
          <CarouselItem
            active={index === 0}
            key={`carousel-${index}`}
            title={item.title}
            description={item.overview}
            certificate={item.certification}
            genres={(item.genres || [])
              .map((element) => element.name)
              .join(", ")}
            imageUrl={backdrop(item.backdrop_path)}
            trailerUrl={youtube(item.youtube)}
          />
        ))}
      </Carousel>
      <MovieList>
        <Title>New In</Title>
        <Row>
          {mores.map((item, index) => (
            <Col lg={3} md={5} sm={5}>
              <Poster
                key={`movie-${index}`}
                id={item.id}
                title={item.title}
                imageUrl={poster(item.poster_path)}
                releaseDate={item.release_date}
              />
            </Col>
          ))}
        </Row>
        {hasMore && !loading && <LoadMore onClick={handleLoadMoreItems} />}
        {loading && <Loader key={0} type={<SyncLoader color="#E76115" />} />}
      </MovieList>
      <ScrollToTop showUnder={130}>
        <span>⬆Top</span>
      </ScrollToTop>
    </Fragment>
  );
};

Home.getInitialProps = async () => {
  const { data } = await imdb.get(`${MOVIE_URL}/popular`, {
    params: { page: 1 },
  });
  const { results } = data;
  const carousels = [];
  for (const item of results.slice(0, 3)) {
    const response = await imdb.get(`${MOVIE_URL}/${item.id}`, {
      params: MOVIE_PARAM,
    });
    const {
      videos: { results },
      release_dates,
    } = response.data;
    const certification = getCertification(release_dates);
    response.data.youtube = results.shift().key || "";
    response.data.certification = certification || "";
    carousels.push(response.data);
  }

  return {
    carousels: carousels,
    movies: results,
  };
};

export default Home;
