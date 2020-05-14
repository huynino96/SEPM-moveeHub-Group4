import React, { Fragment } from 'react';

import Backdrop from '../components/Backdrop';

const Contact = () => (
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
                    <form>
                        <div className="form-group">
                            <label>Name *</label>
                            <input type="text" />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input type="email" />
                        </div>
                        <div className="form-group">
                            <label>Where did you hear about us?</label>
                            <input type="text" />
                        </div>
                        <div className="form-group">
                            <label>Message *</label>
                            <textarea rows={5} defaultValue="" />
                        </div>
                        <div className="form-group right-align">
                            <button className="btn btn-ghost">Send message</button>
                        </div>
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

export default Contact;
