import React from 'react';

const MovieList = ({ children }) => (
    <div className="container section">
        <div className="row">
            <div className="col-sm-12" id="afterHeader">
                {children}
            </div>
        </div>
    </div>
);

export default MovieList;
