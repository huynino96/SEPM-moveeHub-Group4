import React, { Fragment } from 'react';
import Head from 'next/head';

import Wrapper from './Partial/Wrapper';
import Header from './Partial/Header';
import Footer from './Partial/Footer';

const Layout = ({ children }) => (
    <Fragment>
        <Head>
            <title key="title">Hubiee</title>
        </Head>
        <Wrapper>
            <Header/>
            {children}
            <Footer/>
        </Wrapper>
    </Fragment>
);

export default Layout;
