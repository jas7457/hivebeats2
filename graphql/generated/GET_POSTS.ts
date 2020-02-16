/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_POSTS
// ====================================================

export interface GET_POSTS_posts_nodes_featuredImage {
	__typename: 'MediaItem';
	/**
	 * The srcset attribute specifies the URL of the image to use in different
	 * situations. It is a comma separated string of urls and their widths.
	 */
	srcSet: string | null;
	/**
	 * Url of the mediaItem
	 */
	sourceUrl: string | null;
	/**
	 * Alternative text to display when resource is not displayed
	 */
	altText: string | null;
}

export interface GET_POSTS_posts_nodes {
	__typename: 'Post';
	/**
	 * The globally unique identifier of the post object.
	 */
	id: string;
	/**
	 * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
	 */
	title: string | null;
	/**
	 * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name
	 * field and the post_name column in the database for the
	 * &quot;post_objects&quot; table.
	 */
	slug: string | null;
	/**
	 * The permalink of the post
	 */
	link: string | null;
	/**
	 * URI path for the resource
	 */
	uri: string;
	/**
	 * The content of the post.
	 */
	content: string | null;
	/**
	 * The featured image for the object
	 */
	featuredImage: GET_POSTS_posts_nodes_featuredImage | null;
}

export interface GET_POSTS_posts {
	__typename: 'RootQueryToPostConnection';
	/**
	 * The nodes of the connection, without the edges
	 */
	nodes: (GET_POSTS_posts_nodes | null)[] | null;
}

export interface GET_POSTS {
	/**
	 * Connection between the RootQuery type and the RootQuery type
	 */
	posts: GET_POSTS_posts | null;
}
