import React, { Fragment, useContext } from 'react';
import Head from 'next/head';
import { NotificationContainer } from 'react-notifications';

import AppContext from '../context/AppContext';
import Wrapper from './Partial/Wrapper';
import Header from './Partial/Header';
import Footer from './Partial/Footer';
import ModalFullScreenSearch from './Modal/ModalFullScreenSearch';

const Layout = ({ children }) => {
    const { modalSearch, setModalSearch } = useContext(AppContext);
    return (
        <Fragment>
            <Head>
                <title key="title">Hubiee</title>
            </Head>
            <Wrapper>
                <Header/>
                {children}
                <Footer/>
            </Wrapper>
            <ModalFullScreenSearch modal={modalSearch} toggle={setModalSearch} />
            <NotificationContainer />
        </Fragment>
    );
};

export default Layout;
