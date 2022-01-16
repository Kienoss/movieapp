import React ,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionMovie from "../state/actions/actionMovie";
import '@fontsource/roboto/400.css';
import { Link, useParams } from 'react-router-dom';


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
    max-width: 200px;
`
const Centered = styled.div`
    display: grid;
    place-items: center;
`

function MovieSearchedListDisplay (props) {
    const [searchedMovieChunkIndex, setSearchedMovieChunkIndex] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    let { inputmoviename } = useParams();

    useEffect(() => {
        props._getSearchedMovieList(inputmoviename, pageNumber);
    }, [pageNumber]);
    
    if(!props.searchedMovieList){
        return(
            <div>Loading...</div>
        )
    }

    const sliceMovieListIntoChunks = (listType) => {
        let movieList = [];
        let chunkMaxLength = 9;
        if(listType === "searched"){
            movieList = props.searchedMovieList.data.results;
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
    const searchedMovieListChunks = sliceMovieListIntoChunks("searched");
    const handleChunkIndexIncrease = (listType) => {
        let movieListChunks = [];
        if(listType === "searched"){
            movieListChunks = searchedMovieListChunks;
            if(searchedMovieChunkIndex === movieListChunks.length - 1){
                return setSearchedMovieChunkIndex(0);
            }
            setSearchedMovieChunkIndex(searchedMovieChunkIndex+1);
        }
    }
    const handleChunkIndexDecrease = (listType) => {
        let movieListChunks = [];
        if(listType === "searched"){
            movieListChunks = searchedMovieListChunks; 
            if(searchedMovieChunkIndex === 0){
                return setSearchedMovieChunkIndex(movieListChunks.length - 1);
            } 
            setSearchedMovieChunkIndex(searchedMovieChunkIndex-1); 
        }         
    }
    const mapSearchedMovieList = searchedMovieListChunks[searchedMovieChunkIndex].map((searchedMovie, index) => {
        return(
            <Link to={`/movie/${searchedMovie.id}`} key={index}>
                <MovieContainer>
                    <PosterImage src={POSTER_ROOT_URL + searchedMovie.poster_path} alt={"poster"}/>
                </MovieContainer>
            </Link>
        );
    })

    console.log(props)
    return (
        <div>
            <div>
            Searched Movies: {searchedMovieChunkIndex+1}/3
            </div>
            <MovieListContainer>
                <button onClick={() => handleChunkIndexDecrease("searched")}>Left</button>
                {mapSearchedMovieList}
                <button onClick={() => handleChunkIndexIncrease("searched")}>Right</button>
            </MovieListContainer>
        </div>
    )
}

const mapStateToProps = (({reducerMovie}) => {
    return({
        searchedMovieList: reducerMovie.searchedMovieList,
        error: reducerMovie.error,
    })
})

const mapDispatchToProps = ((dispatch) => {
    return({
        _getSearchedMovieList: bindActionCreators(actionMovie.getSearchedMovieList, dispatch),
    })
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(MovieSearchedListDisplay);