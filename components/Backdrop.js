import React from 'react';

const Backdrop = ({ title, subtitle, imageUrl, scroll }) => (
    <div
        id="content_hero"
        style={{ backgroundImage: `url(${imageUrl})` }}
    >
        {scroll && (
            <a href="#afterHeader" className="anchor">
                <img src="/images/scroll-arrow.svg" alt="Scroll down" className="scroll" />
            </a>
        )}
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

Backdrop.defaultProps = {
    scroll: true,
};

export default Backdrop;
