const initialTrendingMovieState = {
	trendingMovieList: null,
	error: null,
}

const reducerMovie = (state = initialTrendingMovieState, action) => {
	switch(action.type){
		case "GET_TRENDING_MOVIE_LIST":
			return {...state, trendingMovieList: action.trendingMovieList};
		case "GET_ERROR_TRENDING_MOVIE":
			return {...state, error: action.error};
		default:
			return state;
	}
}

export default reducerMovie;