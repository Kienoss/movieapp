import { createGlobalStyle } from 'styled-components'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const GlobalStyle = createGlobalStyle`
	body {
		background-color: ${props => (props.theme.dark)};
		color: ${props => (props.theme.light)};
		font-family: "roboto";
		font-weight: 300;
	}
	a {
		text-decoration: none;
		color: ${props => props.theme.light};
	}
`

export default GlobalStyle;