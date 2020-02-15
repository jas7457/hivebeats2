import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default function PostList() {
	const { loading, error, data } = useQuery(GET_POSTS_QUERY);

	if (error) return <div>Error</div>;
	if (loading) return <div>Loading</div>;

	const { posts } = data;

	return (
		<section>
			<ul>
				{posts.nodes.map((post: any, index: number) => (
					<li key={post.id}>
						{post.title}
						<img src={post.featuredImage.sourceUrl} srcSet={post.featuredImage.srcSet} sizes={post.featuredImage.sizes} alt="" />
					</li>
				))}
			</ul>
		</section>
	);
}

export const GET_POSTS_QUERY = gql`
	query getPosts {
		posts {
			nodes {
				id
				title
				slug
				link
				uri
				content
				featuredImage {
					sizes
					srcSet
					sourceUrl
				}
			}
		}
	}
`;
