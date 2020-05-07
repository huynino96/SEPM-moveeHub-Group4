import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
    const { pathname } = useRouter();
    return (
        <div className="navbar" role="navigation">
            <div className="heading">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="search">
                                <a href="#">
                                    <i className="material-icons">search</i>
                                </a>
                            </div>
                            <div className="tel">
                                <a href="mailto:contact@hubiee.com">
                                    <i className="material-icons">mail to us</i> contact@hubiee.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="navbar-header">
                    <Link href="/">
                        <a className="logo" title="Hubiee">
                            <img src="/images/logo.svg" alt="Hubiee" />
                        </a>
                    </Link>
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar top-bar" />
                        <span className="icon-bar middle-bar" />
                        <span className="icon-bar bottom-bar" />
                    </button>
                </div>
                <div className="navbar-collapse collapse">
                    <ul id="menu-primary" className="nav navbar-nav">
                        <li className={pathname === '/' ? 'active' : ''}>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className={pathname === '/whats-on' ? 'active' : ''}>
                            <Link href="/whats-on">
                                <a>What's On</a>
                            </Link>
                        </li>
                        <li className={pathname === '/forum' ? 'active' : ''}>
                            <Link href="/forum">
                                <a>Forum</a>
                            </Link>
                        </li>
                        <li className={pathname === '/login' ? 'active' : ''}>
                            <Link href="/login">
                                <a>Member</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
