import React from 'react';

const MovieTab = ({ title, description, genres, times, duration, certificate, imageUrl }) => (
    <div className="row movie-tabs">
        <div className="col-md-2 col-sm-3">
            <img src={imageUrl} alt={title} />
        </div>
        <div className="col-md-10 col-sm-9">
            <span className="title">{genres}</span>
            <h3 className="no-underline">{title}</h3>
            <p>{description}</p>
            <div className="row">
                <div className="col-md-8 col-sm-9">
                    <hr className="space-10" />
                    <span className="viewing-times">
                        <i className="material-icons">access_time</i>
                        Viewing times
                    </span>
                    {times.map((item, index) => <span key={`time-${index}`} className="time">{item}</span>)}
                </div>
                <div className="col-md-4 col-sm-3 running-time">
                    <hr className="space-10" />
                    {duration} mins <span className="certificate">{certificate}</span>
                </div>
            </div>
        </div>
    </div>
);

export default MovieTab;
