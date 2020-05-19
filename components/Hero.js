import React from 'react';

const Hero = ({ title, description, genres, certificate, imageUrl, trailerUrl }) => (
    <div
        id="content_hero"
        style={{ backgroundImage: `url(${imageUrl})` }}
    >
        <img src="/images/scroll-arrow.svg" alt="Scroll down" className="scroll" />
        {/* Content */}
        <div className="container">
            <div
                className="row blurb scrollme animateme"
                data-when="exit"
                data-from={0}
                data-to={1}
                data-opacity={0}
                data-translatey={100}
            >
                <div className="col-md-9">
                    <span className="title">{genres}</span>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <div className="buttons">
                        <span className="certificate">{certificate === '' ? 'PG' : certificate}</span>
                        <a
                            href={trailerUrl}
                            data-vbtype="video"
                            className="venobox btn btn-default"
                        >
                            <i className="material-icons">play_arrow</i>
                            <span>Play trailer</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Hero;
