import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Link from 'next/link';

import Playlist from './Playlist';
import AspectRatio from '../AspectRatio';
import ResponsiveBackgroundImage from '../ResponsiveBackgroundImage';
import Animation from '../Animation';

import { PlayerContext } from '../../contexts/PlayerContext';
import theme from '../../theme';

import fadeIn from '../../animations/fadeIn';

export default function Player() {
	const { songs, isPlaying, currentSong, playSong, nextSong, previousSong } = useContext(PlayerContext);

	const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
	const playlistRef = useRef<HTMLButtonElement>(undefined as any);

	return (
		<StyledPlayer className="flex align-center">
			<div className="flex align-center flex-no-shrink flex-grow flex-no-basis mr-auto overflow-hidden">
				{currentSong && (
					<>
						<Link href="/post/[slug]" as={`/${currentSong.postLink!}`}>
							<a className="block" title={`View ${[currentSong.songTitle, currentSong.artist].filter((a) => a).join(' - ')}`}>
								<AspectRatio ratio={1} className="player-current-image flex-no-shrink">
									<ResponsiveBackgroundImage src={currentSong.artwork?.sourceUrl!} srcSet={currentSong?.artwork?.srcSet} />
								</AspectRatio>
							</a>
						</Link>
						<div className="song-info overflow-hidden">
							<div className="truncate">{currentSong?.songTitle}</div>
							<div className="song-info__artist truncate">{currentSong.artist}</div>
						</div>
					</>
				)}
			</div>

			<div className="flex flex-no-shrink align-center">
				<StyledButton onClick={previousSong} disabled={currentSong === songs[0]} title="Previous Song">
					<i className="material-icons" style={{ fontSize: '2rem' }}>
						skip_previous
					</i>
				</StyledButton>

				<StyledButton className="primary" onClick={() => playSong(currentSong!)} disabled={!currentSong} title={isPlaying ? 'Pause' : 'Play'}>
					<i className="material-icons" style={{ fontSize: '4rem' }}>
						{isPlaying ? <>pause_circle_filled</> : <>play_circle_filled</>}
					</i>
				</StyledButton>

				<StyledButton onClick={nextSong} disabled={currentSong === songs[songs.length - 1]} title="Next Song">
					<i className="material-icons" style={{ fontSize: '2rem' }}>
						skip_next
					</i>
				</StyledButton>
			</div>

			<div className="flex flex-no-shrink flex-grow flex-no-basis align-end relative">
				<StyledButton
					ref={playlistRef}
					className={classNames('playlist-button ml-auto', { 'is-active': isPlaylistOpen })}
					onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
					title="Playlist"
				>
					<i className="material-icons" style={{ fontSize: '2rem' }}>
						playlist_play
					</i>
				</StyledButton>

				<Animation animation={fadeIn} usingIntersectionObserver={false} reverse={!isPlaylistOpen}>
					<div className="playlist-container absolute right-0">
						<Playlist close={() => setIsPlaylistOpen(false)} buttonRef={playlistRef} />
					</div>
				</Animation>
			</div>
		</StyledPlayer>
	);
}

const StyledPlayer = styled.div`
	background-color: white;
	box-shadow: ${theme.boxShadow.top};
	padding-right: ${theme.dimensions['4']};

	.player-current-image {
		width: 80px;
		margin-right: ${theme.dimensions['4']};
	}

	.song-info {
		.song-info__artist {
			color: ${theme.colors.gray.medium};
		}
	}

	.playlist-button {
		&.is-active {
			color: ${theme.colors.primary.main};
		}
	}

	.playlist-container {
		bottom: 80px;
	}
`;

const StyledButton = styled.button`
	transition: transform 250ms ease-in-out;
	transform-origin: center center;

	&:hover,
	&:focus {
		transform: scale(1.05);
	}

	&.primary {
		color: ${theme.colors.primary.main};
		margin: 0 0.5rem;
	}

	&[disabled] {
		opacity: 0.7;
	}
`;
