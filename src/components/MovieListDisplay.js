import React ,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionMovie from "../state/actions/actionMovie";
import '@fontsource/roboto/400.css';
import { Link } from 'react-router-dom';
import { BulletContainer, ChevronButton, MovieContainer, MovieListContainer, MovieListTitle, PaginationProgressBullet, PaginationProgressContainer, PosterImage, StyledChevronLeft, StyledChevronRight, ThemedButton } from '../styled-component/StyledMovie';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';


const POSTER_ROOT_URL = `https://image.tmdb.org/t/p/original`;



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
			movieList = props.upcomingMovieList.results;
		}
		if(listType === "trending"){
			movieList = props.trendingMovieList.results;
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
	//------------------------------
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
	//------------------------------
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
	//------------------------------
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

	
	
	return(
		<div>
			<div>
				<MovieListTitle>
					Upcoming Movies
				</MovieListTitle>
				<MovieListContainer>
					<ChevronButton>
						<StyledChevronLeft onClick={() => handleChunkIndexDecrease("upcoming")}>Left</StyledChevronLeft>
					</ChevronButton>
					{mapUpcomingMovieList}
					<ChevronButton>
						<StyledChevronRight onClick={() => handleChunkIndexIncrease("upcoming")}>Right</StyledChevronRight>
					</ChevronButton>
				</MovieListContainer>
				<PaginationProgressContainer>
					{renderPaginationProgress(upcomingMovieListChunks, upcomingMovieChunkIndex, setUpcomingMovieChunkIndex)}
				</PaginationProgressContainer>
			</div>
			<div>
				<MovieListTitle>
					Trending Movies
				</MovieListTitle>
				<MovieListContainer>
					<ChevronButton>
						<StyledChevronLeft onClick={() => handleChunkIndexDecrease("trending")}>Left</StyledChevronLeft>
					</ChevronButton>
					{mapTrendingMovieList}
					<ChevronButton>
						<StyledChevronRight onClick={() => handleChunkIndexIncrease("trending")}>Right</StyledChevronRight>
					</ChevronButton>
				</MovieListContainer>
				<PaginationProgressContainer>
					{renderPaginationProgress(trendingMovieListChunks, trendingMovieChunkIndex, setTrendingMovieChunkIndex)}
				</PaginationProgressContainer>
			</div>
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
