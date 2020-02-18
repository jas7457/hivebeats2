/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_POST_BY_SLUG
// ====================================================

export interface GET_POST_BY_SLUG_posts_edges_node_author {
	__typename: 'User';
	/**
	 * First name of the user. This is equivalent to the WP_User-&gt;user_first_name property.
	 */
	firstName: string | null;
	/**
	 * Last name of the user. This is equivalent to the WP_User-&gt;user_last_name property.
	 */
	lastName: string | null;
}

export interface GET_POST_BY_SLUG_posts_edges_node_featuredImage {
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

export interface GET_POST_BY_SLUG_posts_edges_node_song_artwork {
	__typename: 'MediaItem';
	/**
	 * Alternative text to display when resource is not displayed
	 */
	altText: string | null;
	/**
	 * Url of the mediaItem
	 */
	sourceUrl: string | null;
	/**
	 * The srcset attribute specifies the URL of the image to use in different
	 * situations. It is a comma separated string of urls and their widths.
	 */
	srcSet: string | null;
}

export interface GET_POST_BY_SLUG_posts_edges_node_song {
	__typename: 'Post_Song';
	artist: string | null;
	songTitle: string | null;
	streamLink: string | null;
	artwork: GET_POST_BY_SLUG_posts_edges_node_song_artwork | null;
}

export interface GET_POST_BY_SLUG_posts_edges_node {
	__typename: 'Post';
	/**
	 * The author field will return a queryable User type matching the post&#039;s author.
	 */
	author: GET_POST_BY_SLUG_posts_edges_node_author | null;
	/**
	 * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
	 */
	title: string | null;
	/**
	 * The content of the post.
	 */
	content: string | null;
	/**
	 * Post publishing date.
	 */
	date: string | null;
	/**
	 * The featured image for the object
	 */
	featuredImage: GET_POST_BY_SLUG_posts_edges_node_featuredImage | null;
	song: GET_POST_BY_SLUG_posts_edges_node_song | null;
}

export interface GET_POST_BY_SLUG_posts_edges {
	__typename: 'RootQueryToPostConnectionEdge';
	/**
	 * The item at the end of the edge
	 */
	node: GET_POST_BY_SLUG_posts_edges_node | null;
}

export interface GET_POST_BY_SLUG_posts {
	__typename: 'RootQueryToPostConnection';
	/**
	 * Edges for the RootQueryToPostConnection connection
	 */
	edges: (GET_POST_BY_SLUG_posts_edges | null)[] | null;
}

export interface GET_POST_BY_SLUG {
	/**
	 * Connection between the RootQuery type and the RootQuery type
	 */
	posts: GET_POST_BY_SLUG_posts | null;
}

export interface GET_POST_BY_SLUGVariables {
	slug?: string | null;
}
