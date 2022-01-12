import React ,{useEffect} from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionMovie from "../state/actions/actionMovie";
import { useHorizontalScroll } from './HorizontalScroll';

const POSTER_ROOT_URL = `https://image.tmdb.org/t/p/original`;
const TrendingMovieListContainer = styled.div`
    display: flex;
    gap: 5px;
    overflow-x: hidden;
`
const TrendingMovieContainer = styled.div`
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



function TrendingMovieListDisplay(props){
    const scrollRef = useHorizontalScroll();
    useEffect(() => {
        props._getTrendingMovieList();
    }, []);
    if(!props.trendingMovieList){
        return(
            <div>Loading...</div>
        )
    }

    const mapTrendingMovieList = props.trendingMovieList.data.results.map((trendingMovie, index) => {
        return(
            <TrendingMovieContainer key={index}>
                <PosterImage src={POSTER_ROOT_URL + trendingMovie.poster_path} alt={"poster"}/>
            </TrendingMovieContainer>
        );
    })
    return(
        <div>
            <div>
            Trending Movies:
            </div>
            <TrendingMovieListContainer ref={scrollRef}>
                {mapTrendingMovieList}
            </TrendingMovieListContainer>
        </div>
    )
}

const mapStateToProps = (({reducerMovie}) => {
    return({
        trendingMovieList: reducerMovie.trendingMovieList,
        error: reducerMovie.error,
    })
})

const mapDispatchToProps = ((dispatch) => {
    return({
        _getTrendingMovieList: bindActionCreators(actionMovie.getTrendingMovieList, dispatch)
    })
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(TrendingMovieListDisplay);
