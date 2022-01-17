import React from 'react';
import MovieListDisplay from './components/MovieListDisplay';
import MovieDetailDisplay from './components/MovieDetailDisplay';
import MovieSearchedListDisplay from './components/MovieSearchedListDisplay';
import AppBar from './components/AppBar';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const AppContainer = styled.div`
	display: grid;
	place-items: center;
	margin-top: 30px;	
`

const StyledDiv = styled.div`	
	margin-top: 20px;
`

const AppBarContainer = styled.div`
	position: sticky;
	top: 0px;
`

function App(){
	return(
		<BrowserRouter>
			<AppBarContainer>
				<AppBar/>
			</AppBarContainer>
			<AppContainer>
				<Routes>
					<Route path={"/"} exact element={<MovieListDisplay/>}/>
					<Route path={"/:mediatype/:movieid"} element={<MovieDetailDisplay/>}/>
					<Route path={"search/:mediatype/:inputmoviename"} element={<MovieSearchedListDisplay/>}/>
				</Routes>
			</AppContainer>
		</BrowserRouter>
	)
}

export default App;
