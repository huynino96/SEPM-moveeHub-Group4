import React, { Fragment } from 'react';

import Backdrop from '../components/Backdrop';
import MovieTab from '../components/MovieTab';
import calendars from '../utils/calendars';

const WhatsOn = () => (
    <Fragment>
        <Backdrop title="Take a look at" subtitle="What's on this week" imageUrl="/images/hero-1.jpg" />
        <div className="container section" id="afterHeader">
            <div className="row">
                <div className="col-sm-12">
                    <div className="tabs movies">
                        <ul>
                            <li>
                                <a href="#fri">Fri</a>
                            </li>
                            <li>
                                <a href="#sat">Sat</a>
                            </li>
                            <li>
                                <a href="#sun">Sun</a>
                            </li>
                            <li>
                                <a href="#mon">Mon</a>
                            </li>
                            <li>
                                <a href="#tue">Tue</a>
                            </li>
                            <li>
                                <a href="#wed">Wed</a>
                            </li>
                            <li>
                                <a href="#thu">Thu</a>
                            </li>
                            <li className="date">
                                <span>Friday, 22 May</span>
                            </li>
                        </ul>
                        {Object.entries(calendars).map(([key, value], index) => (
                            <div id={key} key={`calendar-${index}`}>
                                {value.map((item, index) => (
                                    <MovieTab
                                        key={`movie-${index}`}
                                        title={item.title}
                                        description={item.description}
                                        genres={item.genres}
                                        times={item.times}
                                        duration={item.duration}
                                        certificate={item.certificate}
                                        imageUrl={item.imageUrl}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
);

export default WhatsOn;
