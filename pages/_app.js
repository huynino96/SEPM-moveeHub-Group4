import React, { useState } from 'react';
import 'react-notifications/lib/notifications.css';

import AppContext from '../context/AppContext';
import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }) => {
    const [authenticated, setAuthenticated] = useState(false);
    return (
        <AppContext.Provider value={{ authenticated, setAuthenticated }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppContext.Provider>
    )
};

export default MyApp;
