import React from 'react';

const Backdrop = ({ title, subtitle, imageUrl }) => (
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
                    <span className="title">{title}</span>
                    <h1>{subtitle}</h1>
                </div>
            </div>
        </div>
    </div>
);

export default Backdrop;
