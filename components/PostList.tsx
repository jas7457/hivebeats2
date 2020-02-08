import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default function PostList() {
	const { loading, error, data, fetchMore, networkStatus } = useQuery(ALL_POSTS_QUERY, { variables: { skip: 0, first: 10 } });

	if (error) return <div>Error</div>;
	if (loading) return <div>Loading</div>;

	const { allPosts } = data;

	return (
		<section>
			<ul>
				{allPosts.map((post: any, index: number) => (
					<li key={post.id}>
						<div>
							<span>{index + 1}. </span>
							<a href={post.url}>{post.title}</a>
						</div>
					</li>
				))}
			</ul>
			<style jsx>{`
				section {
					padding-bottom: 20px;
				}
				li {
					display: block;
					margin-bottom: 10px;
				}
				div {
					align-items: center;
					display: flex;
				}
				a {
					font-size: 14px;
					margin-right: 10px;
					text-decoration: none;
					padding-bottom: 0;
					border: 0;
				}
				span {
					font-size: 14px;
					margin-right: 5px;
				}
				ul {
					margin: 0;
					padding: 0;
				}
				button:before {
					align-self: center;
					border-style: solid;
					border-width: 6px 4px 0 4px;
					border-color: #ffffff transparent transparent transparent;
					content: '';
					height: 0;
					margin-right: 5px;
					width: 0;
				}
			`}</style>
		</section>
	);
}

export const ALL_POSTS_QUERY = gql`
	query allPosts($first: Int!, $skip: Int!) {
		allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
			id
			title
			votes
			url
			createdAt
		}
		_allPostsMeta {
			count
		}
	}
`;
