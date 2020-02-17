import React, { useEffect, useReducer } from 'react';

import Song from '../types/Song';

export default function PlayerProvider(props: { children: React.ReactNode }) {
	const { children } = props;
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		dispatch({ type: 'SET_AUDIO_EL', payload: document.createElement('audio') });

		return () => {
			if (state.audioEl) {
				state.audioEl.pause();
			}
		};
	}, [state.audioEl]);

	// methods to add to the context instead of passing dispatch through the context
	const addSong = (song: Song) => dispatch({ type: 'ADD_SONG', payload: song });
	const playSong = (song: Song) => dispatch({ type: 'PLAY_SONG', payload: song });
	const togglePlay = () => dispatch({ type: 'TOGGLE_PLAY' });
	const nextSong = () => dispatch({ type: 'NEXT_SONG' });
	const previousSong = () => dispatch({ type: 'PREVIOUS_SONG' });

	return (
		<PlayerContext.Provider
			value={{
				audioEl: state.audioEl,
				songs: state.songs,
				currentSong: state.currentSong,
				isPlaying: state.isPlaying,
				addSong,
				playSong,
				togglePlay,
				nextSong,
				previousSong
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
}

function reducer(state: PlayerContextValue, action: PlayerAction): PlayerContextValue {
	const load = (url: string): boolean => {
		if (state.audioEl && state.audioEl.src !== url) {
			state.audioEl!.src = url;
		}

		return !!state.audioEl;
	};

	const play = (url: string) => {
		load(url);
		state.audioEl?.play();
	};

	const pause = () => state.audioEl?.pause();

	switch (action.type) {
		case 'ADD_SONG': {
			const hasSong = state.songs.some(song => song.stream === action.payload.stream);
			if (hasSong) {
				return state;
			}

			// if no songs have loaded, also load this song
			if (state.songs.length === 0) {
				load(action.payload.stream);
			}

			return {
				...state,
				currentSong: state.currentSong || action.payload,
				songs: [...state.songs, action.payload]
			};
		}
		case 'PLAY_SONG': {
			// if the user requests to play what is already the current song
			if (state.currentSong?.stream === action.payload.stream) {
				if (state.isPlaying) {
					pause();
					return {
						...state,
						isPlaying: false
					};
				} else {
					play(action.payload.stream);
					return {
						...state,
						isPlaying: true
					};
				}
			}

			play(action.payload.stream);
			return {
				...state,
				currentSong: action.payload,
				isPlaying: true
			};
		}
		case 'TOGGLE_PLAY': {
			if (state.isPlaying) {
				pause();
			} else {
				play(state.audioEl!.src);
			}

			return {
				...state,
				isPlaying: !state.isPlaying
			};
		}
		case 'NEXT_SONG': {
			const index = state.songs.indexOf(state.currentSong!);
			const nextSong = state.songs[index + 1];
			if (nextSong) {
				play(nextSong.stream);
				return {
					...state,
					currentSong: nextSong,
					isPlaying: true
				};
			} else {
				pause();
				return {
					...state,
					isPlaying: false
				};
			}
		}
		case 'PREVIOUS_SONG': {
			const index = state.songs.indexOf(state.currentSong!);
			const previousSong = state.songs[index - 1];
			if (previousSong) {
				play(previousSong.stream);
				return {
					...state,
					currentSong: previousSong,
					isPlaying: true
				};
			} else {
				pause();
				return {
					...state,
					isPlaying: false
				};
			}
		}

		case 'SET_AUDIO_EL': {
			// the audio el has already been loaded, return the state without changing it
			if (state.audioEl) {
				return state;
			}
			return {
				...state,
				audioEl: action.payload
			};
		}
	}
}

const initialState: PlayerContextValue = {
	audioEl: undefined,
	songs: [],
	currentSong: undefined,
	isPlaying: false,

	addSong: () => {},
	playSong: () => {},
	togglePlay: () => {},
	nextSong: () => {},
	previousSong: () => {}
};

export const PlayerContext = React.createContext<PlayerContextValue>(initialState);

type PlayerAction =
	| { type: 'ADD_SONG'; payload: Song }
	| { type: 'PLAY_SONG'; payload: Song }
	| { type: 'TOGGLE_PLAY' }
	| { type: 'NEXT_SONG' }
	| { type: 'PREVIOUS_SONG' }
	| { type: 'SET_AUDIO_EL'; payload: HTMLAudioElement };

interface PlayerContextValue {
	audioEl: HTMLAudioElement | undefined; // due to SSR, we can't document.createElement('audio') for the initial state
	songs: Song[];
	currentSong: Song | undefined;
	isPlaying: boolean;

	// these get dynamically added to the provider
	addSong: (song: Song) => void;
	playSong: (song: Song) => void;
	togglePlay: () => void;
	nextSong: () => void;
	previousSong: () => void;
}
