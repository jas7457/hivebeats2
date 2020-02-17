import gql from 'graphql-tag';

const GET_POSTS_BY_SLUG_QUERY = gql`
	query GET_POST_BY_SLUG($slug: String) {
		posts(first: 1, where: { name: $slug }) {
			edges {
				node {
					author {
						firstName
						lastName
					}
					title
					content
					date
					featuredImage {
						srcSet
						sourceUrl
						altText
					}
				}
			}
		}
	}
`;

export default GET_POSTS_BY_SLUG_QUERY;
