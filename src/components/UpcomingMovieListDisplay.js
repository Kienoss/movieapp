import React ,{useEffect} from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionMovie from "../state/actions/actionMovie";
import { useHorizontalScroll } from './HorizontalScroll';

const POSTER_ROOT_URL = `https://image.tmdb.org/t/p/original`;
const UpcomingMovieListContainer = styled.div`
    display: flex;
    gap: 5px;
    overflow-x: hidden;
`
const UpcomingMovieContainer = styled.div`
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



function UpcomingMovieListDisplay(props){
    const scrollRef = useHorizontalScroll();
    useEffect(() => {
        props._getUpcomingMovieList();
    }, []);
    if(!props.upcomingMovieList){
        return(
            <div>Loading...</div>
        )
    }
    console.log(props);
    const mapUpcomingMovieList = props.upcomingMovieList.data.results.map((upcomingMovie, index) => {
        return(
            <UpcomingMovieContainer key={index}>
                <PosterImage src={POSTER_ROOT_URL + upcomingMovie.poster_path} alt={"poster"}/>
            </UpcomingMovieContainer>
        );
    })
    return(
        <div>
            <div>
            Upcoming Movies:
            </div>
            <UpcomingMovieListContainer ref={scrollRef}>
                {mapUpcomingMovieList}
            </UpcomingMovieListContainer>
        </div>
    )
}

const mapStateToProps = (({reducerMovie}) => {
    return({
        upcomingMovieList: reducerMovie.upcomingMovieList,
        error: reducerMovie.error,
    })
})

const mapDispatchToProps = ((dispatch) => {
    return({
        _getUpcomingMovieList: bindActionCreators(actionMovie.getUpcomingMovieList, dispatch)
    })
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(UpcomingMovieListDisplay);
