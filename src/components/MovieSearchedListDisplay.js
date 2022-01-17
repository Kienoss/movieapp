import React ,{useEffect, useState} from 'react';
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionMovie from "../state/actions/actionMovie";
import '@fontsource/roboto/400.css';
import { Link, useParams } from 'react-router-dom';
import { BulletContainer, ChevronButton, MovieContainer, MovieListContainer, MovieListTitle, PaginationProgressBullet, PaginationProgressContainer, PosterImage, StyledChevronLeft, StyledChevronRight } from '../styled-component/StyledMovie';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';


const POSTER_ROOT_URL = `https://image.tmdb.org/t/p/original`;

function MovieSearchedListDisplay (props) {
	const [searchedMovieChunkIndex, setSearchedMovieChunkIndex] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	let { inputmoviename, mediatype } = useParams();
	useEffect(() => {
		props._getSearchedMovieList(inputmoviename, pageNumber);
	}, [pageNumber, inputmoviename]);
	useEffect(()=>{
		setPageNumber(1);
	}, [inputmoviename])
	useEffect(()=>{
		setSearchedMovieChunkIndex(0);
	}, [pageNumber])
	if(!props.searchedMovieList){
		return(
			<div>Loading...</div>
		)
	}
	const sliceMovieListIntoChunks = (listType) => {
		let movieList = [];
		let chunkMaxLength = 9;
		if(listType === "searched"){
			movieList = props.searchedMovieList.results;
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

	const renderPosterImage = (searchedMoviePosterPath) => {
		const emptyImagePath = "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
		const posterPath = searchedMoviePosterPath ? POSTER_ROOT_URL + searchedMoviePosterPath : emptyImagePath; 
		return (
			<PosterImage src={posterPath} alt={"poster"}/>
		)
	}

	const renderSearchedMovieListChunk = () => {
		if(!searchedMovieListChunks[searchedMovieChunkIndex]){
			return (
				<div>Empty</div>
			)
		}
		const mapSearchedMovieList = searchedMovieListChunks[searchedMovieChunkIndex].map((searchedMovie, index) => {
			return(
				<Link to={`/movie/${searchedMovie.id}`} key={index}>
					<MovieContainer>
						{renderPosterImage(searchedMovie.poster_path)}
					</MovieContainer>
				</Link>
			);
		})
		return (
			<MovieListContainer>
				<ChevronButton>
					<StyledChevronLeft onClick={() => handleChunkIndexDecrease("searched")}>Left</StyledChevronLeft>
				</ChevronButton>
				{mapSearchedMovieList}
				<ChevronButton>
					<StyledChevronRight onClick={() => handleChunkIndexIncrease("searched")}>Right</StyledChevronRight>
				</ChevronButton>
			</MovieListContainer>
		)
	}

	const renderPaginationProgress = (movieListChunks, currentChunkIndex, setChunkIndex) => {
		if(!movieListChunks){
			return null;
		}
		const paginationProgressArray = movieListChunks.map((movieList, index) => {
			return (
				<BulletContainer onClick={() => setChunkIndex(index)} key={index}>
					<PaginationProgressBullet activeBullet={currentChunkIndex === index}/>
				</BulletContainer>
			)
		})
		return paginationProgressArray;
	}

	const handlePageNumberDecrease = () => {
		if(pageNumber <= 1){
			setPageNumber(props.searchedMovieList.total_pages);
			return;
		}
		setPageNumber(pageNumber - 1)
	}

	const handlePageNumberIncrease = () => {
		if(pageNumber === props.searchedMovieList.total_pages){
			setPageNumber(1);
			return;
		}
		setPageNumber(pageNumber + 1);
	}

	return (
		<div>
			<MovieListTitle>
				Searched Movies
			</MovieListTitle>
			{renderSearchedMovieListChunk()}
			<PaginationProgressContainer>
				{renderPaginationProgress(searchedMovieListChunks, searchedMovieChunkIndex, setSearchedMovieChunkIndex)}  
			</PaginationProgressContainer>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
			}}>
				<ChevronLeft style={{cursor: 'pointer'}} onClick={() => handlePageNumberDecrease()}/>
				{pageNumber}
				<ChevronRight style={{cursor: 'pointer'}} onClick={() => handlePageNumberIncrease()}/>	
			</div> 
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