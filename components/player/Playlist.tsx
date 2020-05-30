import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import useClickOutside from '../../hooks/useClickOutside';

import { PlayerContext } from '../../contexts/PlayerContext';
import AspectRatio from '../AspectRatio';
import Card from '../Card';
import ResponsiveBackgroundImage from '../ResponsiveBackgroundImage';

import theme from '../../theme';

export default function Playlist({ close, buttonRef }: PlaylistProps) {
	const { songs, currentSong, playSong, isPlaying } = useContext(PlayerContext);
	const playlistRef = useRef<any>(undefined);

	useClickOutside(playlistRef, (e) => {
		// this makes it so that clicks on the button do not close and then immediately open the playlist again
		if (!buttonRef.current.contains(e.target as HTMLElement)) {
			close();
		}
	});

	return (
		<StyledPlaylist ref={playlistRef}>
			<Card className="card-container flex flex-column" rounded="sm">
				{currentSong && (
					<AspectRatio className="flex-no-shrink" ratio={4 / 16}>
						<ResponsiveBackgroundImage src={currentSong.artwork?.sourceUrl!}>
							<div className="playlist-current flex flex-column justify-center h-full">
								<div className="song-title">{currentSong?.songTitle}</div>
								<div className="artist">{currentSong?.artist}</div>
							</div>
						</ResponsiveBackgroundImage>
					</AspectRatio>
				)}

				<ul className="flex-shrink list-reset overflow-y-auto">
					{songs.map((song) => (
						<li key={song.streamLink!} className="flex align-center">
							<AspectRatio className="background-image flex-no-shrink" ratio={1}>
								<ResponsiveBackgroundImage
									src={song.artwork?.sourceUrl!}
									srcSet={song.artwork?.srcSet}
									altText={song.artwork?.altText}
								>
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
				</ul>
			</Card>
		</StyledPlaylist>
	);
}

interface PlaylistProps {
	close: () => void;
	buttonRef: React.MutableRefObject<HTMLButtonElement>;
}

const StyledPlaylist = styled.div`
	width: 500px;
	max-width: 90vw;

	&:after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		right: 12px;
		bottom: -15px;
		border: 8px solid white;
		transform-origin: 0 0;
		transform: rotate(-45deg);
		box-shadow: -12px 12px 15px -4px rgba(0, 0, 0, 0.25);
	}

	.card-container {
		max-height: 600px;
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

	.playlist-current {
		padding: ${theme.dimensions['2']};
		color: white;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(2px);

		.song-title {
			font-size: ${theme.text['2xl']};
		}

		.artist {
			color: ${theme.colors.gray.lightest};
		}
	}
`;
