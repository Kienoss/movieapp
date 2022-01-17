import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export const ChevronButton = styled.div`
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
`
export const StyledChevronLeft = styled(ChevronLeft)`
	font-size: 60px;
`
export const StyledChevronRight = styled(ChevronRight)`
	font-size: 60px;
`

export const MovieListTitle = styled.div`
	font-size: 24px;
	margin-bottom: 16px;
`


export const MovieListContainer = styled.div`
	display: flex;
	gap: 3px;
`

export const MovieContainer = styled.div`
	display: grid;
	place-items: top center;
`

export const PosterImage = styled.img`
	max-height: 200px;
	max-width: 133.32px;
	min-height: 200px;
	min-width: 133.32px;
`

export const Centered = styled.div`
	display: grid;
	place-items: center;
`

export const ThemedButton = styled.button`
`

export const PaginationProgressBullet = styled.span`
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: white;
	opacity: ${props => props.activeBullet ? 1 : 0.15};
`

export const BulletContainer = styled.div`
	display: inline-block;
	padding: 8px;
	cursor: pointer;
`

export const PaginationProgressContainer = styled.div`
	display: flex;
	justify-content: center;
`