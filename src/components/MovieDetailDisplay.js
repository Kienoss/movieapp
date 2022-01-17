import React ,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionMovie from "../state/actions/actionMovie";
import '@fontsource/roboto/400.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';


const POSTER_ROOT_URL = `https://image.tmdb.org/t/p/original`;

const PosterImage = styled.img`
	max-height: 450px;
	max-width: 300px;
	min-height: 450px;
	min-width: 300px;
`

const FlexContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
`

const GenreContainer = styled.div`
	display: inline-block;
	&:after {
		content: " / ";
	}
	&:last-child:after{
		content: ".";
	}
`

const MovieTitle = styled.div`
	font-weight: 500;
	font-size: 30px;
	margin-bottom: 20px;
`

const MovieInfoContainer = styled.div`
`

const MovieOverviewHeader = styled.div`
	font-weight: 400;
	font-size: 20px;
	margin-bottom: 10px;
	margin-top: 10px;
`

function MovieDetailDisplay (props) {
	let { movieid, mediatype } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		props._getMovieDetail(movieid, mediatype);
	}, []);

	if(!props.movieDetail){
		return(
			<div>Loading...</div>
		)
	}

	const mapMovieDetailGenre = props.movieDetail.genres.map((genre, index) => {
		return (
			<GenreContainer key={index}>
				{genre.name}
			</GenreContainer>
		)
	})


	const renderPosterImage = () => {
		const emptyImagePath = "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
		const posterPath = props.movieDetail.poster_path ? POSTER_ROOT_URL + props.movieDetail.poster_path : emptyImagePath; 
		return (
			<PosterImage src={posterPath} alt={"poster"}/>
		)
	}
	const {movieDetail} = props;
	const {original_title, original_name, name} = movieDetail;
	console.log(props.movieDetail)
	return (
		<div>
			<div>
				<ArrowBack style={{cursor: 'pointer', fontSize: '50px'}} onClick={()=>navigate(-1)}></ArrowBack>
			</div>
			<FlexContainer>
				{renderPosterImage()}
				<MovieInfoContainer>
					<MovieTitle>
						{original_title || name || original_name}
					</MovieTitle>
					<div>
						Average Vote: {props.movieDetail.vote_average}
					</div>
					<div>
						Genres: {mapMovieDetailGenre}
					</div>
				</MovieInfoContainer> 
			</FlexContainer>
			<div>
				<MovieOverviewHeader>
					Overview
				</MovieOverviewHeader>
				{props.movieDetail.overview}
			</div>
		</div>
	)
}

const mapStateToProps = (({reducerMovie}) => {
	return({
		movieDetail: reducerMovie.movieDetail,   
		error: reducerMovie.error,
	})
})

const mapDispatchToProps = ((dispatch) => {
	return({
		_getMovieDetail: bindActionCreators(actionMovie.getMovieDetail, dispatch),
	})
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(MovieDetailDisplay);