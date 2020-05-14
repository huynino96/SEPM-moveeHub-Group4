import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "./constants";

const backdrop = path => IMAGE_BASE_URL + BACKDROP_SIZE + path;
const poster = path => IMAGE_BASE_URL + POSTER_SIZE + path;

export {
    backdrop,
    poster,
};
