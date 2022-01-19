import *  as React from 'react';
import { useRef } from 'react';
import { styled as styledMUI, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import '@fontsource/roboto/400.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'


const Search = styledMUI('div')(({ theme }) => ({
  	position: 'relative',
  	borderRadius: theme.shape.borderRadius,
  	backgroundColor: alpha(theme.palette.common.white, 0.15),
  	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
  	},
  	marginLeft: 0,
  	width: '100%',
  	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
  	},
}));

const SearchIconWrapper = styledMUI('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
  	height: '100%',
  	position: 'absolute',
  	pointerEvents: 'none',
  	display: 'flex',
  	alignItems: 'center',
  	justifyContent: 'center',
}));

const StyledInputBase = styledMUI(InputBase)(({ theme }) => ({
  	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
  	},
}));

const ThemeAppBar = styled(AppBar)`
	background-color: ${(props) => props.theme.highlight3};
	opacity: 0.9;
`



export default function SearchAppBar() {

	const searchMovieInput = useRef();
	const navigate = useNavigate()

	const handleKeyDown = (e) => {
		if(e.key !== 'Enter') return
		if(e.key === 'Enter') {
			console.log(searchMovieInput.current.value)
			navigate(`search/movie/${searchMovieInput.current.value}`);
		}
	}
  	return (
		<Box sx={{ flexGrow: 1 }}>
			<ThemeAppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
					>
						<Link to={"/"}>
							MOVIE
						</Link>
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search', ref: searchMovieInput }}
							onKeyDown={handleKeyDown}
						/>
					</Search>
				</Toolbar>
			</ThemeAppBar>
		</Box>
  	);
}

