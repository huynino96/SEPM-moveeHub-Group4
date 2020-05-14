import React, { Fragment } from 'react';
import Link from 'next/link';

import Backdrop from '../components/Backdrop';

const Login = () => (
    <Fragment>
        <Backdrop title="Write review? Let's" subtitle="Login" imageUrl="/images/hero-3.jpg" />
        <div className="container section">
            <div className="row">
                <div className="col-sm-3" />
                <div className="col-sm-6">
                    <form>
                        <div className="form-group">
                            <label>Email *</label>
                            <input type="email" />
                        </div>
                        <div className="form-group">
                            <label>Password *</label>
                            <input type="text" />
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-ghost">Log In</button>
                        </div>
                        <div className="form-group text-center">
                            Dont have an account ? Sign up <Link href="/register"><a>here</a></Link>
                        </div>
                    </form>
                </div>
                <div className="col-sm-3" />
            </div>
        </div>
    </Fragment>
);

export default Login;
