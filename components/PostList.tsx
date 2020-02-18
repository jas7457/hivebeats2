import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Link from 'next/link';

import Container from './layout/Container';
import GraphQL from './GraphQL';
import Text from './Text';
import ResponsiveBackgroundImage from './ResponsiveBackgroundImage';
import AspectRatio from './AspectRatio';

import { PlayerContext } from '../contexts/PlayerContext';

import GET_POSTS_QUERY from '../graphql/queries/GET_POSTS_QUERY';
import { GET_POSTS, GET_POSTS_posts_nodes } from '../graphql/generated/GET_POSTS';
import Song from '../types/Song';
import theme from '../theme';

export default function PostList() {
	const result = useQuery<GET_POSTS>(GET_POSTS_QUERY);

	return (
		<GraphQL result={result}>
			{data => (
				<Container>
					<section>
						<StyledPostList className="list-reset flex flex-wrap">
							{data.posts!.nodes!.map((post, index) => (
								<PostListItem key={post!.id} {...post!} song={index % 2 === 0 ? testSongs[0] : testSongs[1]} />
							))}
						</StyledPostList>
					</section>
				</Container>
			)}
		</GraphQL>
	);
}

function PostListItem(props: GET_POSTS_posts_nodes & { song: Song }) {
	const { title, featuredImage, song, uri } = props;

	const { addSong } = useContext(PlayerContext);

	useEffect(() => {
		addSong(song);
	}, [addSong, song]);

	return (
		<li>
			<Link href="/post/[slug]" as={uri!}>
				<a>
					<Text>{title!}</Text>
					<AspectRatio ratio={1}>
						{featuredImage && (
							<ResponsiveBackgroundImage src={featuredImage.sourceUrl!} srcSet={featuredImage.srcSet} altText={featuredImage.altText} />
						)}
					</AspectRatio>
				</a>
			</Link>
		</li>
	);
}

const StyledPostList = styled.ul`
	& > li {
		width: 50%;
		padding: 0 ${theme.dimensions['2']};
	}
`;

const testSongs: Song[] = [
	{
		artist: 'Ramriddlz',
		title: '"SCUMROD" (prod. by Jaegen & Sticks)',
		artwork: 'http://localhost/hivebeats/wp-content/uploads/2020/02/photo-1505740420928-5e560c06d30e.jpg',
		stream: 'https://api.soundcloud.com/tracks/754867822/stream?client_id=d3bb97412667a7812924715ea66498af'
	},
	{
		artist: 'Brent Faiyaz',
		title: 'Clouded',
		artwork: 'http://localhost/hivebeats/wp-content/uploads/2020/02/photo-1494232410401-ad00d5433cfa.jpg',
		stream: 'https://api.soundcloud.com/tracks/719473789/stream?client_id=d3bb97412667a7812924715ea66498af'
	}
];
