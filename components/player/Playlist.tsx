import React, { useContext } from 'react';
import styled from 'styled-components';

import { PlayerContext } from '../../contexts/PlayerContext';
import AspectRatio from '../AspectRatio';
import ResponsiveBackgroundImage from '../ResponsiveBackgroundImage';

import theme from '../../theme';

export default function Playlist() {
	const { songs, currentSong, playSong, isPlaying } = useContext(PlayerContext);

	return (
		<StyledPlaylist className="list-reset">
			{songs.map(song => (
				<li key={song.streamLink!} className="flex align-center">
					<AspectRatio className="background-image flex-no-shrink" ratio={1}>
						<ResponsiveBackgroundImage src={song.artwork?.sourceUrl!} srcSet={song.artwork?.srcSet} altText={song.artwork?.altText}>
							<div className="h-full w-full flex align-center justify-center">
								<button onClick={() => playSong(song)}>
									<i className="material-icons play-icon" style={{ fontSize: 35 }}>
										{isPlaying && currentSong === song ? <>pause_circle_filled</> : <>play_circle_filled</>}
									</i>
								</button>
							</div>
						</ResponsiveBackgroundImage>
					</AspectRatio>
					<div className="song-info flex-grow flex-shrink overflow-hidden">
						<div className="truncate">{song.songTitle}</div>
						<div className="song-info__artist truncate">{song.artist}</div>
					</div>
				</li>
			))}
		</StyledPlaylist>
	);
}

const StyledPlaylist = styled.ul`
	background-color: white;
	box-shadow: ${theme.boxShadow.all};
	width: 500px;
	max-width: 90vw;
	border-radius: 2px;

	&:after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		right: 12px;
		border: 8px solid white;
		transform-origin: 0 0;
		transform: rotate(-45deg);
		box-shadow: -12px 12px 15px -4px rgba(0, 0, 0, 0.25);
	}

	.background-image {
		width: 55px;
	}

	.play-icon {
		color: ${theme.colors.primary.main};
	}

	.song-info {
		padding: ${theme.dimensions['2']};

		.song-info__artist {
			color: ${theme.colors.gray.medium};
		}
	}
`;
