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
                type: "GET_ERROR_TRENDING_MOVIE",
                error,
            })
        })
    }
}