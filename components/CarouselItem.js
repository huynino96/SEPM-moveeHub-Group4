import React from 'react';

const CarouselItem = ({ active, title, description, genres, certificate, imageUrl, trailerUrl }) => (
    <div
        className={`item${ active ? ' active' : ''}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
    >
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

CarouselItem.defaultProps = {
    title: 'End of the World: Part II',
    description: 'Claritas est etiam processus dynamicus, qui sequitur mutationem\n' +
    'consuetudium lectorum. Mirum est notare quam littera gothica, quam\n' +
    'nunc putamus parum.',
    genres: 'Action, Adventure, Fantasy',
    certificate: 'PG',
    imageUrl: 'http://via.placeholder.com/1140x665',
    trailerUrl: 'https://youtu.be/ScMzIvxBSi4',
};

export default CarouselItem;
