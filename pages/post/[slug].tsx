import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import Container from '../../components/layout/Container';
import GraphQL from '../../components/GraphQL';
import Text from '../../components/Text';
import ResponsiveImage from '../../components/ResponsiveImage';

import GET_POSTS_BY_SLUG_QUERY from '../../graphql/queries/GET_POST_BY_SLUG';
import { GET_POST_BY_SLUG, GET_POST_BY_SLUGVariables } from '../../graphql/generated/GET_POST_BY_SLUG';

export default function Post() {
	const router = useRouter();
	const { slug } = router.query as { slug: string };

	const result = useQuery<GET_POST_BY_SLUG, GET_POST_BY_SLUGVariables>(GET_POSTS_BY_SLUG_QUERY, { variables: { slug } });

	return (
		<GraphQL result={result}>
			{data => {
				if (!data?.posts?.edges?.[0]?.node) {
					return null;
				}

				return (
					<Container>
						<ResponsiveImage {...data.posts.edges[0].node.featuredImage!} />
						<div>
							<Text>{data.posts.edges[0].node.title!}</Text>
						</div>

						<div>
							<Text>{data.posts.edges[0].node.content!}</Text>
						</div>
					</Container>
				);
			}}
		</GraphQL>
	);
}
