import React, { Fragment, useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
import SyncLoader from 'react-spinners/SyncLoader';

import auth from '../client/auth';
import AppContext from '../context/AppContext';
import { API_URL, ITEM_URL, COMMENT_COLLECTION, COMMENT_PARAM, REDIRECT_TO_LOGIN } from '../utils/constants';
import { avatar } from '../utils/helpers';
import Backdrop from '../components/Backdrop';
import Title from '../components/Title';
import Error from '../components/Error';
import Comments from '../components/Comments';
import Comment from '../components/Comment';
import Loader from '../components/Loader';

const Profile = () => {
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingComment, setLoadingComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    const { push } = useRouter();
    const { authenticated } = useContext(AppContext);
    const { register, handleSubmit, errors, setValue } = useForm();

    useEffect(() => {
        const item = JSON.parse(window.localStorage.getItem('user'));
        setValue([
            { first_name: item.first_name },
            { last_name: item.last_name },
            { email: item.email },
        ]);
        setUser(item);
        fetchComments();
    }, []);

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            push(REDIRECT_TO_LOGIN);
        }
    }, [authenticated]);

    const onSubmit = async item => {
        try {
            setLoadingButton(true);
            if (item.password === '') delete item.password;
            const { data: { data } } = await auth.patch(`${API_URL}/users/${user.id}`, item);
            window.localStorage.setItem('user', JSON.stringify(data));
            NotificationManager.success('Saved Profile Successfully!');
        } catch (e) {
            NotificationManager.error(e.response.data.error.message);
        } finally {
            setLoadingButton(false);
        }
    };

    const fetchComments = async () => {
        try {
            setLoadingComment(true);
            const { data: { data } } = await auth.get(`${ITEM_URL}/${COMMENT_COLLECTION}`, { params: COMMENT_PARAM });
            setComments(data);
        } catch (e) {
            NotificationManager.error(e.response.data.error.message);
        } finally {
            setLoadingComment(false);
        }
    };

    return (
        <Fragment>
            <Backdrop title="Your information and comments" subtitle="Profile" imageUrl="/images/hero-5.jpg" />
            <Container className="section">
                <Row>
                    <Col sm={7}>
                        <Title>Comments</Title>
                        <Comments>
                            {comments.map((item, index) => (
                                <Comment
                                    key={`comment-${index}`}
                                    name={item.owner.email}
                                    comment={item.comment}
                                    date={item.created_on}
                                    imageUrl={avatar(item.owner.email)}
                                />
                            ))}
                            {loadingComment && <Loader key={0} type={<SyncLoader color="#E76115" />} />}
                        </Comments>
                    </Col>
                    <Col sm={4} className="col-sm-push-1">
                        <Title>Profile</Title>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name="first_name" ref={register()} />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="last_name" ref={register()} />
                            </div>
                            <div className="form-group">
                                <label>Email * {errors.email && <Error>({ errors.email.message })</Error>}</label>
                                <input
                                    type="email"
                                    name="email"
                                    ref={register({
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: 'Invalid email address',
                                        }
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" ref={register()} />
                            </div>
                            <div className="form-group">
                                {!loadingButton && <button className="btn btn-ghost">Save</button>}
                                {loadingButton && <Loader key={0} type={<SyncLoader color="#E76115" />} />}
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Profile;
