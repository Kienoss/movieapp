import React from 'react';
import TrendingMovieListDisplay from './components/TrendingMovieListDisplay';
import UpcomingMovieListDisplay from './components/UpcomingMovieListDisplay';
import styled from 'styled-components';

const AppContainer = styled.div`	
`

const StyledDiv = styled.div`	
	margin-top: 20px;
`

function App(props) {
	return (
		<AppContainer>
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
