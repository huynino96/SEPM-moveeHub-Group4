import React, { Fragment, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import SyncLoader from 'react-spinners/SyncLoader';
import { NotificationManager } from 'react-notifications';

import auth from '../client/auth';
import AppContext from '../context/AppContext';
import Backdrop from '../components/Backdrop';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { API_URL, REDIRECT_TO_PROFILE, REDIRECT_TO_LOGIN } from '../utils/constants';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthenticated } = useContext(AppContext);
    const { register, handleSubmit, getValues, errors } = useForm();
    const { push } = useRouter();

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            push(REDIRECT_TO_PROFILE);
        }
    }, []);

    const onSubmit = async item => {
        try {
            setLoading(true);
            delete item.confirm_password;
            item.role = 5; // member
            item.status = 'active';
            await auth.post(`${API_URL}/users`, item);
            NotificationManager.success('Signed Up Successfully!');
            setAuthenticated(true);
            push(REDIRECT_TO_LOGIN);
        } catch (e) {
            NotificationManager.error(e.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Backdrop title="Don't have account? Let's" subtitle="Register" imageUrl="/images/hero-4.jpg" />
            <div className="container section" id="afterHeader">
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
