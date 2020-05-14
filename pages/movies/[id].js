import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

import Hero from '../../components/Hero';

const Movies = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Fragment>
            <Hero />
            <div className="container section single-movie">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Synopsis</h2>
                        <div className="row">
                            <div className="col-sm-3">
                                <img
                                    src="http://via.placeholder.com/265x340"
                                    alt="Transformers: The Last Knight"
                                    className="poster"
                                />
                                <div className="share">
                                    <a href="#">
                                        <i className="fa fa-facebook" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-twitter" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-pinterest" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-google-plus" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <h3 className="no-underline">The plot</h3>
                                <p>
                                    Humans and Transformers are at war, Optimus Prime is gone. The key
                                    to saving our future lies buried in the secrets of the past, in the
                                    hidden history of Transformers on Earth.
                                </p>
                                <p>
                                    Optimus Prime finds his home planet, Cybertron, now a dead planet,
                                    in which he comes to find he was responsible for killing. He finds a
                                    way to bring the planet back to life, but in order to do so, he
                                    needs to find an artifact, which is on Earth.
                                </p>
                                <ul className="movie-info">
                                    <li>
                                        <i>Director</i> Michael Bay
                                    </li>
                                    <li>
                                        <i>Starring</i> Mark Wahlberg, Anthony Hopkins
                                    </li>
                                    <li>
                                        <i>Release date</i> 23 June 2017
                                    </li>
                                    <li>
                                        <i>Running time</i> 114 mins
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container section single-movie">
                <div className="row">
                    <div className="col-sm-7">
                        <h2>Comments</h2>
                        <div className="comments">
                            <div className="row">
                                <div className="col-sm-2">
                                    <img src="/images/avatar.png" className="Luke Barrett" />
                                </div>
                                <div className="col-sm-9">
                                    <span className="date">February 2, at 2:34pm</span>
                                    <h4 className="no-underline">Luke Barrett</h4>
                                    <p>
                                        Claritas est etiam processus dynamicus, qui sequitur mutationem
                                        consuetudium lectorum. Mirum est notare quam littera gothica, quam
                                        nunc putamus parum claram, anteposuerit litterarum formas
                                        humanitatis per seacula quarta decima et quinta decima.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <img src="/images/avatar.png" className="Keith Cox" />
                                </div>
                                <div className="col-sm-9">
                                    <span className="date">February 2, at 2:34pm</span>
                                    <h4 className="no-underline">Keith Cox</h4>
                                    <p>
                                        Claritas est etiam processus dynamicus, qui sequitur mutationem
                                        consuetudium lectorum. Mirum est notare quam littera gothica, quam
                                        nunc putamus parum claram, anteposuerit litterarum formas
                                        humanitatis per seacula quarta decima et quinta decima.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <img src="/images/avatar.png" className="Gabriel Norris" />
                                </div>
                                <div className="col-sm-9">
                                    <span className="date">February 2, at 2:34pm</span>
                                    <h4 className="no-underline">Gabriel Norris</h4>
                                    <p>
                                        Claritas est etiam processus dynamicus, qui sequitur mutationem
                                        consuetudium lectorum. Mirum est notare quam littera gothica, quam
                                        nunc putamus parum claram, anteposuerit litterarum formas
                                        humanitatis per seacula quarta decima et quinta decima.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <img src="/images/avatar.png" className="Luke Barrett" />
                                </div>
                                <div className="col-sm-9">
                                    <span className="date">February 2, at 2:34pm</span>
                                    <h4 className="no-underline">Luke Barrett</h4>
                                    <p>
                                        Claritas est etiam processus dynamicus, qui sequitur mutationem
                                        consuetudium lectorum. Mirum est notare quam littera gothica, quam
                                        nunc putamus parum claram, anteposuerit litterarum formas
                                        humanitatis per seacula quarta decima et quinta decima.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <img src="/images/avatar.png" className="Gabriel Norris" />
                                </div>
                                <div className="col-sm-9">
                                    <span className="date">February 2, at 2:34pm</span>
                                    <h4 className="no-underline">Gabriel Norris</h4>
                                    <p>
                                        Claritas est etiam processus dynamicus, qui sequitur mutationem
                                        consuetudium lectorum. Mirum est notare quam littera gothica, quam
                                        nunc putamus parum claram, anteposuerit litterarum formas
                                        humanitatis per seacula quarta decima et quinta decima.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-sm-push-1">
                        <h2>Leave a comment</h2>
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
                                <label>Website</label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>Comments *</label>
                                <textarea rows={5} defaultValue={""} />
                            </div>
                            <div className="form-group right-align">
                                <button className="btn btn-ghost">Post comment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Movies;
