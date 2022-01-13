const initialTrendingMovieState = {
	trendingMovieList: null,
	upcomingMovieList: null,
	error: null,
}

const reducerMovie = (state = initialTrendingMovieState, action) => {
	switch(action.type){
		case "GET_TRENDING_MOVIE_LIST":
			return {...state, trendingMovieList: action.trendingMovieList};
		case "GET_UPCOMING_MOVIE_LIST":
			return {...state, upcomingMovieList: action.upcomingMovieList};
		case "GET_ERROR_MOVIE":
			return {...state, error: action.error};
		default:
			return state;
	}
}

export default reducerMovie;