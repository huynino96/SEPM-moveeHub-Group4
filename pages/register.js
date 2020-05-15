import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import SyncLoader from 'react-spinners/SyncLoader';
import { NotificationManager } from 'react-notifications';

import client from '../client';
import Backdrop from '../components/Backdrop';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { API_URL } from '../utils/constants';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, getValues, errors } = useForm();
    const router = useRouter();

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            NotificationManager.error('You already Logged In!');
            router.push('/');
        }
    });

    const onSubmit = async data => {
        setLoading(true);
        try {
            delete data.confirm_password;
            data.role = 5; // member
            data.status = 'active';
            const response = await client.post(`${API_URL}/users`, data);
            const item = response.data.data;
            window.localStorage.setItem('token', JSON.stringify(item));
            window.localStorage.setItem('user', JSON.stringify(item));
            NotificationManager.success('Signed Up Successfully!');
            router.push('/');
        } catch (e) {
            NotificationManager.error(e.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Fragment>
            <Backdrop title="Don't have account? Let's" subtitle="Register" imageUrl="/images/hero-4.jpg" />
            <div className="container section">
                <div className="row">
                    <div className="col-sm-3" />
                    <div className="col-sm-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                <label>Password * {errors.password && <Error>({ errors.password.message })</Error>}</label>
                                <input type="password" name="password" ref={register({ required: 'Password is required' })} />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password * {errors.confirm_password && <Error>({ errors.confirm_password.message })</Error>}</label>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    ref={register({
                                        required: 'Confirm Password is required',
                                        validate: {
                                            matchesPreviousPassword: (value) => {
                                                const { password } = getValues();
                                                return password === value || 'Passwords should match!';
                                            },
                                        }
                                    })}
                                />
                            </div>
                            {!loading && (
                                <Fragment>
                                    <div className="form-group text-center">
                                        <button className="btn btn-ghost">Sign Up</button>
                                    </div>
                                    <div className="form-group text-center">
                                        Already have an account ? Login <Link href="/login"><a>here</a></Link>
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

export default Register;
