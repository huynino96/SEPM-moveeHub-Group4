import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SyncLoader from 'react-spinners/SyncLoader';
import { Container, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';

import imdb from '../../client/imdb';
import auth from '../../client/auth';
import client from '../../client';
import { COMMENT_COLLECTION, COMMENT_PARAM, ITEM_URL, MOVIE_PARAM, MOVIE_URL } from '../../utils/constants';
import { backdrop, poster, youtube, getCertification, avatar } from '../../utils/helpers';
import Hero from '../../components/Hero';
import Detail from '../../components/Detail';
import Title from '../../components/Title';
import Comments from '../../components/Comments';
import Comment from '../../components/Comment';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

const Movies = ({ item, directors, cast, trailer, certification, comments }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [mores, setMores] = useState(comments);
    const { register, handleSubmit, errors, reset } = useForm();
    const { query: { id }, asPath } = useRouter();

    useEffect(() => {
        if (comments.length <= 0) {
            setMores([]);
        }
    }, [asPath]);

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')));
    }, []);

    const onSubmit = async item => {
        try {
            setLoading(true);
            item.movie_id = id;
            const { data: { data } } = await auth.post(`${ITEM_URL}/${COMMENT_COLLECTION}`, item);
            const more = { ...data, owner: user };
            setMores([ more, ...mores ]);
            reset();
        } catch (e) {
            NotificationManager.error(e.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (id, liked) => {
        try {
            await auth.patch(`${ITEM_URL}/${COMMENT_COLLECTION}/${id}`, { liked: !liked });
            const items = [...mores]
                .map(item => {
                    if (item.id === id) {
                        item.liked = !liked;
                    }
                    return item;
                });
            setMores(items);
        } catch (e) {
            NotificationManager.error(e.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Hero
                title={item.title}
                description={item.overview}
                genres={(item.genres || []).map(element => element.name).join(', ')}
                certificate={certification}
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
            <Container className="section">
                <Row>
                    <Col sm={7}>
                        <Title>Comments</Title>
                        <Comments>
                            {mores.map((item, index) => (
                                <Comment
                                    key={`comment-${index}`}
                                    id={item.id}
                                    name={item.owner.email}
                                    comment={item.comment}
                                    date={item.created_on}
                                    imageUrl={avatar(item.owner.email)}
                                    canAction={user !== null}
                                    like={item.liked}
                                    onLike={handleLike}
                                />
                            ))}
                        </Comments>
                    </Col>
                    <Col sm={4} className="col-sm-push-1">
                        <Title>Leave a comment</Title>
                        {!user && (
                            <p>
                                You have to <Link href="/login"><a>login</a></Link> or <Link href="/register"><a>register</a></Link> to leave a comment
                            </p>
                        )}
                        {user && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" name="email" value={user.email} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Comment * {errors.comment && <Error>({ errors.comment.message })</Error>}</label>
                                    <textarea name="comment" rows={5} ref={register({ required: 'Comment is required' })} />
                                </div>
                                <div className="form-group">
                                    {!loading && <button className="btn btn-ghost">Submit</button>}
                                    {loading && <Loader key={0} type={<SyncLoader color="#E76115" />} />}
                                </div>
                            </form>
                        )}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

Movies.getInitialProps = async ({ query: { id } }) => {
    const { data } = await imdb.get(`${MOVIE_URL}/${id}`, { params: MOVIE_PARAM });
    const response = await client.get(`${ITEM_URL}/${COMMENT_COLLECTION}`, { params: { ...COMMENT_PARAM, 'filter[movie_id][eq]': id } });
    const comments = response.data.data;
    const { videos, credits } = data;
    const { results } = videos;
    const youtube = results.map(item => item.key);
    const { crew, cast } = credits;
    const { release_dates } = data;
    const certification = getCertification(release_dates);
    return {
        item: data,
        directors: crew.filter(item => item.job === 'Director').map(item => item.name),
        cast: cast.map(item => item.name),
        trailer: (youtube || []).shift(),
        trailers: youtube,
        certification,
        comments,
    }
};

export default Movies;
