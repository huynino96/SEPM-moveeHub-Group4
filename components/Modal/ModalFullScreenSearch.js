import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic';

import imdb from '../../client/imdb';
import { poster } from '../../utils/helpers';
import {MOVIE_URL, SEARCH_URL} from '../../utils/constants';
import Poster from '../Poster';
import LoadMore from "../LoadMore";
import {NotificationManager} from "react-notifications";
import Loader from "../Loader";
import SyncLoader from "react-spinners/SyncLoader";

const Modal = dynamic(() => import('react-responsive-modal'), { ssr: false });

const ModalFullScreenSearch = ({ modal, toggle }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const { asPath } = useRouter();

    useEffect(() => {
        handleClose();
    }, [asPath]);

    const handleClose = () => {
        setItems([]);
        setLoading(false);
        setHasMore(false);
        setPage(1);
        setKeyword('');
        toggle(false);
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
            const response = await imdb.get(SEARCH_URL, { params: { page , query: keyword } });
            const { data: { results, total_pages } } = response;
            setItems(results);
            setHasMore(page <= total_pages);
            setKeyword(keyword);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreItems = async () => {
        try {
            const nextPage = page + 1;
            const { data } = await imdb.get(`${MOVIE_URL}/popular`, { params: { page: nextPage, query: keyword } });
            const { results, total_pages } = data;
            setItems([ ...items, ...results ]);
            setHasMore(page <= total_pages);
            setPage(nextPage);
        } catch (e) {
            NotificationManager.error('Can not load more movies');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMoreItems = () => {
        setLoading(true);
        setTimeout(async () => await loadMoreItems(), 500);
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
                {loading && <Loader key={0} type={<SyncLoader color="#E76115" />} />}
                {(hasMore && !loading) && <LoadMore onClick={handleLoadMoreItems} />}
            </section>
        </Modal>
    );
};

ModalFullScreenSearch.defaultProps = {
    modal: false,
    toggle: () => {},
};

export default ModalFullScreenSearch;
