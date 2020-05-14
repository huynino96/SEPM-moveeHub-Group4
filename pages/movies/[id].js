import React, { Fragment } from 'react';
import client from '../../client';

import Hero from '../../components/Hero';
import { MOVIE_URL } from '../../utils/constants';
import { backdrop, poster } from '../../utils/helpers';
import Detail from "../../components/Detail";

const Movies = ({ item, directors, cast }) => (
    <Fragment>
        <Hero
            title={item.title}
            description={item.overview}
            genres={(item.genres || []).map(element => element.name).join(', ')}
            certificate="18"
            imageUrl={backdrop(item.backdrop_path)}
            trailerUrl="https://youtu.be/ScMzIvxBSi4"
        />
        <Detail
            title={item.title}
            description={item.overview}
            directors={directors.join(', ')}
            cast={cast.join(', ')}
            duration={item.runtime}
            releaseDate={item.release_date}
            imageUrl={poster(item.poster_path)}
        />
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

Movies.getInitialProps = async ({ query }) => {
    const { id } = query;
    const { data } = await client.get(`${MOVIE_URL}/${id}`);
    const credits = await client.get(`${MOVIE_URL}/${id}/credits`);
    const { crew, cast } = credits.data;
    return {
        item: data,
        directors: crew.filter(item => item.job === 'Director').map(item => item.name),
        cast: cast.map(item => item.name),
    }
};

export default Movies;
