import React from 'react';
import Link from 'next/link';

const Poster = ({ id, title, imageUrl, releaseDate }) => (
    <div
        className="movie-slide slick-slide slick-current slick-active"
        style={{ width: '100%', height: 470, display: 'block' }}
    >
        <div className="movie-poster">
            <aside>
                <div>
                    <Link href={`/movies/[id]`} as={`/movies/${id}`}>
                        <a className="play" tabIndex={0}>
                            <i className="material-icons">play_arrow</i>
                        </a>
                    </Link>
                    <Link href={`/movies/[id]`} as={`/movies/${id}`}>
                        <a className="read-more" tabIndex={0}>
                            read more
                        </a>
                    </Link>
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
