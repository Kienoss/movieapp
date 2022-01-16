import React ,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionMovie from "../state/actions/actionMovie";
import '@fontsource/roboto/400.css';
import { Link, useParams } from 'react-router-dom';


const POSTER_ROOT_URL = `https://image.tmdb.org/t/p/original`;

const PosterImage = styled.img`
    max-height: 450px;
    max-width: 450px;
`

const FlexContainer = styled.div`
    display: flex;
    justify-content: top;
    gap: 10px;
`

function MovieDetailDisplay (props) {
    const [imageSource, setImageSource] = useState("")
    let { movieid, mediatype } = useParams();
    useEffect(() => {
        props._getMovieDetail(movieid, mediatype);
    }, []);

    if(!props.movieDetail){
        return(
            <div>Loading...</div>
        )
    }

    const mapMovieDetailGenre = props.movieDetail.data.genres.map((genre, index) => {
        return (
            <span key={index}>
                {`${genre.name}/`}
            </span>
        )
    })
    // if(props.movieDetail.data.poster_path == null){
    //     setImageSource("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg")
    // }
    // if(props.movieDetail.data.poster_path){
    //     setImageSource(POSTER_ROOT_URL + props.movieDetail.data.poster_path);
    // }
    return (
        <div>
            <div>
                <Link to={"/"}>
                    <button>Back</button>
                </Link>
            </div>
            <FlexContainer>
                <PosterImage src={POSTER_ROOT_URL + props.movieDetail.data.poster_path} alt={"poster"}/>
                <div>
                    <div>
                        {props.movieDetail.data.original_title}
                    </div>
                    <div>
                        Average Vote: {props.movieDetail.data.vote_average}
                    </div>
                    <div>
                        Genres: {mapMovieDetailGenre}
                    </div>
                </div> 
            </FlexContainer>
            <div>
                {props.movieDetail.data.overview}
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