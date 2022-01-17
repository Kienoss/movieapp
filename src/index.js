import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './state/store';
import { Provider } from 'react-redux';
import GlobalStyle from './styled-component/GlobalStyle'
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';

const colorPalette1 = {
	dark: "#293241",
	light: "#E0FBFC",
	highlight1: "#3D5A80",
	highlight2: "#98C1D9",
	highlight3: "#EE6C4D",
}

const colorPalette2 = {
	dark: "#283D3B",
	light: "#EDDDD4",
	highlight1: "#197278",
	highlight2: "#C44536",
	highlight3: "#772E25",
}

const colorPalette3 = {
	dark: "#242423",
	light: "#E8EDDF",
	highlight1: "#CFDBD5",
	highlight2: "#F5CB5C",
	highlight3: "#333533",
} 

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={colorPalette3}>
					<GlobalStyle/>
					<App />
				</ThemeProvider>
			</StyledEngineProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);


