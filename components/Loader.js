import React from 'react';

const Loader = ({ type, align }) => (
    <div className="col-lg-12 col-md-12 col-sm-12">
        <div className={align}>{type}</div>
    </div>
);

Loader.defaultProps = {
    align: 'text-center',
};

export default Loader;
