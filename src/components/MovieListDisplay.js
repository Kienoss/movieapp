import React ,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionMovie from "../state/actions/actionMovie";
import '@fontsource/roboto/400.css';
import { Link } from 'react-router-dom';


const POSTER_ROOT_URL = `https://image.tmdb.org/t/p/original`;


const MovieListContainer = styled.div`
    display: flex;
    gap: 3px;
`
const MovieContainer = styled.div`
    display: grid;
    place-items: top center;
`
const PosterImage = styled.img`
    max-height: 200px;
    max-width: 133.32px;
    min-height: 200px;
    min-width: 133.32px;
`
const Centered = styled.div`
    display: grid;
    place-items: center;
`


//----------------------------------------------------------------
function MovieListDisplay(props){
    const [upcomingMovieChunkIndex, setUpcomingMovieChunkIndex] = useState(0);
    const [trendingMovieChunkIndex, setTrendingMovieChunkIndex] = useState(0);


    useEffect(() => {
        props._getUpcomingMovieList();
        props._getTrendingMovieList();
    }, []);

    if(!props.upcomingMovieList || !props.trendingMovieList){
        return(
            <div>Loading...</div>
        )
    }

    const sliceMovieListIntoChunks = (listType) => {
        let movieList = [];
        let chunkMaxLength = 9;
        if(listType === "upcoming"){
            movieList = props.upcomingMovieList.data.results;
        }
        if(listType === "trending"){
            movieList = props.trendingMovieList.data.results;
        }
        let movieListChunks = [];
        for(let i = 0; i < movieList.length; i+=chunkMaxLength) {
            const currentChunk = movieList.slice(i,i + chunkMaxLength)
            if(currentChunk.length < chunkMaxLength){
                const chunkLengthDiff = chunkMaxLength - currentChunk.length
                const filledChunk = movieList.slice(0, chunkLengthDiff)
                movieListChunks.push([...currentChunk, ...filledChunk])
            } else {
                movieListChunks.push(currentChunk)
            } 
        }
        return movieListChunks;
    }

    const upcomingMovieListChunks = sliceMovieListIntoChunks("upcoming");
    const trendingMovieListChunks = sliceMovieListIntoChunks("trending");

    const handleChunkIndexIncrease = (listType) => {
        let movieListChunks = [];
        if(listType === "upcoming"){
            movieListChunks = upcomingMovieListChunks;
            if(upcomingMovieChunkIndex === movieListChunks.length - 1){
                return setUpcomingMovieChunkIndex(0);
            }
            setUpcomingMovieChunkIndex(upcomingMovieChunkIndex+1);
        }
        if(listType === "trending"){
            movieListChunks = trendingMovieListChunks;
            if(trendingMovieChunkIndex === movieListChunks.length - 1){
                return setTrendingMovieChunkIndex(0);
            }
            setTrendingMovieChunkIndex(trendingMovieChunkIndex+1);  
        }
    }
    const handleChunkIndexDecrease = (listType) => {
        let movieListChunks = [];
        if(listType === "upcoming"){
            movieListChunks = upcomingMovieListChunks;
            if(upcomingMovieChunkIndex === 0){
                return setUpcomingMovieChunkIndex(movieListChunks.length - 1);
            } 
            setUpcomingMovieChunkIndex(upcomingMovieChunkIndex-1);
        }
        if(listType === "trending"){
            movieListChunks = trendingMovieListChunks; 
            if(trendingMovieChunkIndex === 0){
                return setTrendingMovieChunkIndex(movieListChunks.length - 1);
            } 
            setTrendingMovieChunkIndex(trendingMovieChunkIndex-1); 
        }       
    }
    console.log(props)
    const mapUpcomingMovieList = upcomingMovieListChunks[upcomingMovieChunkIndex].map((upcomingMovie, index) => {
        return(
            <Link to={`/movie/${upcomingMovie.id}`} key={index}>
                <MovieContainer>
                    <PosterImage src={POSTER_ROOT_URL + upcomingMovie.poster_path} alt={"poster"}/>
                </MovieContainer>
            </Link>
        );
    })

    const mapTrendingMovieList = trendingMovieListChunks[trendingMovieChunkIndex].map((trendingMovie, index) => {
        return(
            <Link to={`/${trendingMovie.media_type}/${trendingMovie.id}`} key={index}>
                <MovieContainer>
                    <PosterImage src={POSTER_ROOT_URL + trendingMovie.poster_path} alt={"poster"}/>
                </MovieContainer>
            </Link>
        );
    })

    
    
    return(
        <div>
            <div>
                <div>
                Upcoming Movies: {upcomingMovieChunkIndex+1}/3
                </div>
                <MovieListContainer>
                    <button onClick={() => handleChunkIndexDecrease("upcoming")}>Left</button>
                    {mapUpcomingMovieList}
                    <button onClick={() => handleChunkIndexIncrease("upcoming")}>Right</button>
                </MovieListContainer>
            </div>
            <div>
                <div>
                Trending Movies: {trendingMovieChunkIndex+1}/3
                </div>
                <MovieListContainer>
                    <button onClick={() => handleChunkIndexDecrease("trending")}>Left</button>
                    {mapTrendingMovieList}
                    <button onClick={() => handleChunkIndexIncrease("trending")}>Right</button>
                </MovieListContainer>
            </div>
            <div><Link to={`search/movie/avengers`}><button>TEST</button></Link></div>

        </div>
    )
}

const mapStateToProps = (({reducerMovie}) => {
    return({
        upcomingMovieList: reducerMovie.upcomingMovieList,
        trendingMovieList: reducerMovie.trendingMovieList,
        error: reducerMovie.error,
    })
})

const mapDispatchToProps = ((dispatch) => {
    return({
        _getUpcomingMovieList: bindActionCreators(actionMovie.getUpcomingMovieList, dispatch),
        _getTrendingMovieList: bindActionCreators(actionMovie.getTrendingMovieList, dispatch),
        _getSearchedMovieList: bindActionCreators(actionMovie.getSearchedMovieList, dispatch),
    })
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(MovieListDisplay);
