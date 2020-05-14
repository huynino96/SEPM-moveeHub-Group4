import React, { Fragment } from 'react';

import Backdrop from '../components/Backdrop';
import Link from "next/link";

const Register = () => (
    <Fragment>
        <Backdrop title="Don't have account? Let's" subtitle="Register" imageUrl="/images/hero-4.jpg" />
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
                        <div className="form-group">
                            <label>Confirm Password *</label>
                            <input type="text" />
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-ghost">Sign Up</button>
                        </div>
                        <div className="form-group text-center">
                            Already have an account ? Login <Link href="/login"><a>here</a></Link>
                        </div>
                    </form>
                </div>
                <div className="col-sm-3" />
            </div>
        </div>
    </Fragment>
);

export default Register;
