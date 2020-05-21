import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import AppContext from '../context/AppContext';
import { REDIRECT_TO_LOGIN } from '../utils/constants';
import Backdrop from '../components/Backdrop';

const Profile = () => {
    const { push } = useRouter();
    const { authenticated } = useContext(AppContext);

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            push(REDIRECT_TO_LOGIN);
        }
    }, [authenticated]);

    return <Backdrop title="Your information and comments" subtitle="Profile" imageUrl="/images/hero-3.jpg" />
};

export default Profile;
