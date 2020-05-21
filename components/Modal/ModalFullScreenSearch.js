import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic';

import imdb from '../../client/imdb';
import { poster } from '../../utils/helpers';
import { SEARCH_URL } from '../../utils/constants';
import Poster from '../Poster';

const Modal = dynamic(() => import('react-responsive-modal'), { ssr: false });

const ModalFullScreenSearch = ({ modal, toggle }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setItems([]);
        toggle();
    };

    const handleSearch = async event => {
        const keyword = event.target.value;

        // No keyword then remove all items
        if (keyword.length <= 0) {
            setItems([]);
            return false;
        }

        // Search movie by keyword
        try {
            setLoading(true);
            const { data: { results } } = await imdb.get(SEARCH_URL, { params: { page: 1, query: keyword } });
            setItems(results);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            classNames={{
                modal: 'search-modal',
                overlay: 'search-overlay',
                closeButton: 'search-close',
            }}
            open={modal}
            onClose={handleClose}
            center={false}
        >
            <section>
                <form onSubmit={event => event.preventDefault()}>
                    <h2 className="search-title">Search</h2>
                    <p className="search-field">
                        <input
                            type="text"
                            name="keyword"
                            className="form-control search-input"
                            autoComplete="off"
                            placeholder="I'm looking for"
                            autoFocus={!isMobile}
                            onChange={handleSearch}
                        />
                    </p>
                </form>
                {loading && (
                    <div className="search-loading">
                        <ClipLoader size={120} color="#fff" />
                    </div>
                )}
                {!loading && (
                    <div className="search-result">
                        <div className="row">
                            {items.map((item, index) => (
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <Poster
                                        key={`movie-${index}`}
                                        id={item.id}
                                        title={item.title}
                                        imageUrl={poster(item.poster_path)}
                                        releaseDate={item.release_date}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </Modal>
    );
};

ModalFullScreenSearch.defaultProps = {
    modal: false,
    toggle: () => {},
};

export default ModalFullScreenSearch;
