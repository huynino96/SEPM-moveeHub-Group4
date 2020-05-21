import React, { Fragment, useState } from 'react';

import Backdrop from '../components/Backdrop';
import client from '../client';
import { ITEM_URL, CONTACT_COLLECTION } from '../utils/constants';
import { NotificationManager } from 'react-notifications';
import { useForm } from 'react-hook-form';
import Error from '../components/Error';
import Loader from '../components/Loader';
import SyncLoader from 'react-spinners/SyncLoader';

const Contact = () => {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = async data => {
        try {
            setLoading(true);
            await client.post(`${ITEM_URL}/${CONTACT_COLLECTION}`, data);
            NotificationManager.success('Message Sent Successfully!');
            reset();
        } catch (e) {
            NotificationManager.error(e.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Backdrop title="Have any questions?" subtitle="Please contact us" imageUrl="/images/hero-2.jpg" scroll={false} />
            {/* Section */}
            <div className="container section negative-margin">
                <div className="row">
                    <div className="col-sm-12">
                        <div id="map" />
                    </div>
                </div>
            </div>
            {/* Section */}
            <div className="container section negative-margin contact">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Send a message</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Name * {errors.name && <Error>({ errors.name.message })</Error>}</label>
                                <input type="name" name="name" ref={register({ required: 'Name is required' })} />
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
                                <label>Message * {errors.message && <Error>({ errors.message.message })</Error>}</label>
                                <textarea name="message" rows={5} ref={register({ required: 'Message is required' })} />
                            </div>
                            {!loading && (
                                <div className="form-group right-align">
                                    <button className="btn btn-ghost">Send message</button>
                                </div>
                            )}
                            {loading && <Loader key={0} type={<SyncLoader color="#E76115" />} align="text-right" />}
                        </form>
                    </div>
                    <div className="col-sm-5 col-sm-push-1">
                        <div className="icon-row">
                            <div className="col">
                            <span className="circle">
                                <i className="material-icons">place</i>
                            </span>
                            </div>
                            <div className="col">
                                <h4 className="no-underline">Address</h4>
                                <p>Ho Chi Minh city</p>
                            </div>
                        </div>
                        <div className="icon-row">
                            <div className="col">
                            <span className="circle">
                                <i className="material-icons">email</i>
                            </span>
                            </div>
                            <div className="col">
                                <h4 className="no-underline">Email</h4>
                                <p>contact@hubiee.com</p>
                            </div>
                        </div>
                        <div className="icon-row">
                            <div className="col">
                            <span className="circle">
                                <i className="material-icons">phone in talk</i>
                            </span>
                            </div>
                            <div className="col">
                                <h4 className="no-underline">Telephone</h4>
                                <p>+84 688 699 69</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Contact;
