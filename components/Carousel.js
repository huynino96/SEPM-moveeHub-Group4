import React from 'react';

const Carousel = ({ children }) => (
    <div id="hero" className="carousel slide carousel-fade" data-ride="carousel">
        <a href="#afterHeader" className="anchor">
            <img src="/images/scroll-arrow.svg" alt="Scroll down" className="scroll" />
        </a>
        {/* Indicators */}
        <div className="container">
            <ol className="carousel-indicators">
                <li data-target="#hero" data-slide-to={0} className="active" />
                <li data-target="#hero" data-slide-to={1} />
                <li data-target="#hero" data-slide-to={2} />
            </ol>
        </div>
        {/* Wrapper for slides */}
        <div className="carousel-inner">
            {children}
        </div>
    </div>
);

export default Carousel;
