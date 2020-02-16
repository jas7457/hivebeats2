import gql from 'graphql-tag';

const GET_POSTS_QUERY = gql`
	query GET_POSTS {
		posts {
			nodes {
				id
				title
				slug
				link
				uri
				content
				featuredImage {
					srcSet
					sourceUrl
					altText
				}
			}
		}
	}
`;

export default GET_POSTS_QUERY;
