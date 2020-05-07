import React from 'react';

const Poster = ({ title, imageUrl, releaseDate }) => (
    <div
        className="movie-slide slick-slide slick-current slick-active"
        data-slick-index={0}
        aria-hidden="false"
        tabIndex={-1}
        role="option"
        aria-describedby="slick-slide00"
        style={{ width: 263, height: 470, display: 'block' }}
    >
        <div className="movie-poster">
            <aside>
                <div>
                    <a
                        href="https://youtu.be/ScMzIvxBSi4"
                        data-vbtype="video"
                        className="venobox play"
                        tabIndex={0}
                    >
                        <i className="material-icons">play_arrow</i>
                    </a>
                    <a href="#" className="read-more" tabIndex={0}>
                        read more
                    </a>
                    <span className="date">Released: {releaseDate}</span>
                </div>
            </aside>
            <a href="#" tabIndex={0}>
                <img src={imageUrl} alt={title} />
            </a>
        </div>
        <h4 className={`no-underline`}>{title}</h4>
    </div>
);

export default Poster;
