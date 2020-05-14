import React from 'react';
import 'react-notifications/lib/notifications.css';

import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }) => (
    <Layout>
        <Component {...pageProps} />
    </Layout>
);

export default MyApp;
