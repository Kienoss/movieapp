import axios from 'axios';

const API_KEY = 'b45ac1c17d69c3203bb70624ab561b2f';

export function getTrendingMovieList(){
    return function(dispatch){
        return axios({
            baseURL: `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`,
            method: "get",
            params: {

            }
        }).then((trendingMovieList) => {
            dispatch({
                type: "GET_TRENDING_MOVIE_LIST",
                trendingMovieList,
            })
        }).catch((error) => {
            dispatch({
                type: "GET_ERROR_MOVIE",
                error,
            })
        })
    }
}

export function getUpcomingMovieList(){
    return function(dispatch){
        return axios({
            baseURL: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
            method: "get",
            params: {
                language: "en-US",
                page: "1",
            }
        }).then((upcomingMovieList) => {
            dispatch({
                type: "GET_UPCOMING_MOVIE_LIST",
                upcomingMovieList,
            })
        }).catch((error) => {
            dispatch({
                type: "GET_ERROR_MOVIE",
                error,
            })
        })
    }
}

export function getSearchedMovieList(searchInput, page){
    return function(dispatch){
        return axios({
            baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`,
            method: "get",
            params: {
                language: "en-US",
                query: searchInput,
                page: page,
            }
        }).then((searchedMovieList) => {
            dispatch({
                type: "GET_SEARCHED_MOVIE_LIST",
                searchedMovieList,
            })
        }).catch((error) => {
            dispatch({
                type: "GET_ERROR_MOVIE",
                error,
            })
        })
    }
}

export function getMovieDetail(movieID, mediaType){
    return function(dispatch) {
        return axios({
            baseURL: `https://api.themoviedb.org/3/${mediaType}/${movieID}?api_key=${API_KEY}`,
            method: "get",
            params: {

            }
        }).then((movieDetail)=>{
            dispatch({
                type: "GET_MOVIE_DETAIL",
                movieDetail
            })
        }).catch((error)=>{
            dispatch({
                type: "GET_ERROR_MOVIE",
                error,
            })
        })
    }
}

