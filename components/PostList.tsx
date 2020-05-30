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
import theme from '../theme';

export default function PostList() {
	const result = useQuery<GET_POSTS>(GET_POSTS_QUERY);

	return (
		<GraphQL result={result}>
			{(data) => (
				<Container>
					<section>
						<StyledPostList className="flex flex-wrap list-reset">
							{data.posts!.nodes!.map((post) => (
								<PostListItem key={post!.id} {...post!} />
							))}
						</StyledPostList>
					</section>
				</Container>
			)}
		</GraphQL>
	);
}

function PostListItem(props: GET_POSTS_posts_nodes) {
	const { title, featuredImage, song, uri } = props;

	const { addSong } = useContext(PlayerContext);

	useEffect(() => {
		if (!song) {
			return;
		}
		addSong({ ...song, postLink: uri });
	}, [addSong, song]);

	return (
		<li>
			<Link href="/post/[slug]" as={`/${uri!}`}>
				<a className="block">
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
		width: 33%;
		padding: 0 ${theme.dimensions['2']};
	}
`;
