import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import GraphQL from './GraphQL';

import GET_POSTS_QUERY from '../graphql/queries/GET_POSTS_QUERY';
import { GET_POSTS } from '../graphql/generated/GET_POSTS';
import ResponsiveImage from './ResponsiveImage';

export default function PostList() {
	const result = useQuery<GET_POSTS>(GET_POSTS_QUERY);

	return (
		<GraphQL result={result}>
			{data => (
				<section>
					<ul>
						{data.posts!.nodes!.map(post => (
							<li key={post!.id}>
								{post!.title}
								<ResponsiveImage {...post!.featuredImage!} />
							</li>
						))}
					</ul>
				</section>
			)}
		</GraphQL>
	);
}
