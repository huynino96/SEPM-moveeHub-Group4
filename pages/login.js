import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import SyncLoader from 'react-spinners/SyncLoader';
import { NotificationManager } from 'react-notifications';

import client from '../client';
import Backdrop from '../components/Backdrop';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { AUTH_URL } from '../utils/constants';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async data => {
        setLoading(true);
        try {
            const response = await client.post(`${AUTH_URL}/authenticate`, data);
            const { token, user } = response.data.data;
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user', JSON.stringify(user));
            NotificationManager.success('Logged In Successfully!');
        } catch (e) {
            NotificationManager.error(e.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Backdrop title="Write review? Let's" subtitle="Login" imageUrl="/images/hero-3.jpg" />
            <div className="container section">
                <div className="row">
                    <div className="col-sm-3" />
                    <div className="col-sm-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Email * {errors.email && <Error>(Email is required)</Error>}</label>
                                <input type="email" name="email" ref={register({ required: true })} />
                            </div>
                            <div className="form-group">
                                <label>Password * {errors.password && <Error>(Password is required)</Error>}</label>
                                <input type="password" name="password" ref={register({ required: true })} />
                            </div>
                            {!loading && (
                                <Fragment>
                                    <div className="form-group text-center">
                                        <button className="btn btn-ghost" type="submit">Log In</button>
                                    </div>
                                    <div className="form-group text-center">
                                        Dont have an account ? Sign up <Link href="/register"><a>here</a></Link>
                                    </div>
                                </Fragment>
                            )}
                            {loading && <Loader key={0} type={<SyncLoader color="#E76115" />} />}
                        </form>
                    </div>
                    <div className="col-sm-3" />
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
