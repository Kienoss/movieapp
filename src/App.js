import React from 'react';
import TrendingMovieListDisplay from './components/TrendingMovieListDisplay';
import UpcomingMovieListDisplay from './components/UpcomingMovieListDisplay';
import AppBar from './components/AppBar';
import styled from 'styled-components';

const AppContainer = styled.div`	
`

const StyledDiv = styled.div`	
	margin-top: 20px;
`

const AppBarContainer = styled.div`
	position: sticky;
	top: 0px;
`

function App(props) {
	return (
		<AppContainer>
			<AppBarContainer>
				<AppBar/>
			</AppBarContainer>
			<StyledDiv>
				<TrendingMovieListDisplay/>
			</StyledDiv>
			<StyledDiv>
				<UpcomingMovieListDisplay/>
			</StyledDiv>		
		</AppContainer>
  	);
}

export default App;
