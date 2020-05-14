import React from 'react';

const LoadMore = ({ onClick }) => (
    <div className="row text-center">
        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <button className="btn btn-ghost" onClick={onClick}>Load more</button>
        </div>
    </div>
);

export default LoadMore;
