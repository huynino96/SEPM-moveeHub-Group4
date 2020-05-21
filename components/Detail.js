import React from 'react';

const Detail = ({ title, description, directors, cast, releaseDate, duration, imageUrl }) => (
    <div className="container section single-movie">
        <div className="row">
            <div className="col-sm-12">
                <h2>Synopsis</h2>
                <div className="row">
                    <div className="col-sm-3">
                        <img
                            src={imageUrl}
                            alt="Transformers: The Last Knight"
                            className="poster"
                        />
                    </div>
                    <div className="col-sm-9">
                        <h3 className="no-underline">{title}</h3>
                        <p>{description}</p>
                        <ul className="movie-info">
                            <li>
                                <i>Director</i> {directors}
                            </li>
                            <li>
                                <i>Starring</i> {cast}
                            </li>
                            <li>
                                <i>Release date</i> {releaseDate}
                            </li>
                            <li>
                                <i>Running time</i> {duration} mins
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Detail;
