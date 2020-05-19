import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "./constants";

const backdrop = path => IMAGE_BASE_URL + BACKDROP_SIZE + path;
const poster = path => IMAGE_BASE_URL + POSTER_SIZE + path;
const youtube = id => `https://www.youtube.com/watch?v=${id}`;
const getCertification = releaseDates => releaseDates
    .results
    .filter(item => item.iso_3166_1 === 'US')
    .shift()
    .release_dates
    .shift()
    .certification;

export {
    backdrop,
    poster,
    youtube,
    getCertification,
};
