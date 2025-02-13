import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

let globalApolloClient = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 */
export const withApollo = ({ ssr = true } = {}) => PageComponent => {
	// eslint-disable-next-line react/prop-types
	const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
		const client = apolloClient || initApolloClient(apolloState);
		return (
			<ApolloProvider client={client}>
				<PageComponent {...pageProps} />
			</ApolloProvider>
		);
	};

	// Set the correct displayName in development
	if (process.env.NODE_ENV !== 'production') {
		const displayName = PageComponent.displayName || PageComponent.name || 'Component';

		WithApollo.displayName = `withApollo(${displayName})`;
	}

	if (ssr || PageComponent.getInitialProps) {
		WithApollo.getInitialProps = async ctx => {
			const { AppTree } = ctx;
			const inAppContext = Boolean(ctx.ctx);

			if (process.env.NODE_ENV === 'development') {
				if (inAppContext) {
					console.warn(
						'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
							'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n'
					);
				}
			}

			if (ctx.apolloClient) {
				throw new Error('Multiple instances of withApollo found.');
			}

			// Initialize ApolloClient
			const apolloClient = initApolloClient();

			// Add apolloClient to NextPageContext & NextAppContext
			// This allows us to consume the apolloClient inside our
			// custom `getInitialProps({ apolloClient })`.
			ctx.apolloClient = apolloClient;
			if (inAppContext) {
				ctx.ctx.apolloClient = apolloClient;
			}

			// Run wrapped getInitialProps methods
			let pageProps = {};
			if (PageComponent.getInitialProps) {
				pageProps = await PageComponent.getInitialProps(ctx);
			} else if (inAppContext) {
				pageProps = await App.getInitialProps(ctx);
			}

			// Only on the server:
			if (typeof window === 'undefined') {
				// When redirecting, the response is finished.
				// No point in continuing to render
				if (ctx.res && ctx.res.finished) {
					return pageProps;
				}

				// Only if ssr is enabled
				if (ssr) {
					try {
						// Run all GraphQL queries
						const { getDataFromTree } = await import('@apollo/react-ssr');

						// Since AppComponents and PageComponents have different context types
						// we need to modify their props a little.
						let props;
						if (inAppContext) {
							props = { ...pageProps, apolloClient };
						} else {
							props = { pageProps: { ...pageProps, apolloClient } };
						}

						// Takes React AppTree, determine which queries are needed to render,
						// then fetche them all.
						await getDataFromTree(<AppTree {...props} />);
					} catch (error) {
						// Prevent Apollo Client GraphQL errors from crashing SSR.
						// Handle them in components via the data.error prop:
						// https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
						console.error('Error while running `getDataFromTree`', error);
					}

					// getDataFromTree does not call componentWillUnmount
					// head side effect therefore need to be cleared manually
					Head.rewind();
				}
			}

			// Extract query data from the Apollo store
			const apolloState = apolloClient.cache.extract();

			return {
				...pageProps,
				apolloState
			};
		};
	}

	return WithApollo;
};

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
const initApolloClient = initialState => {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (typeof window === 'undefined') {
		return createApolloClient(initialState);
	}

	// Reuse client on the client-side
	if (!globalApolloClient) {
		globalApolloClient = createApolloClient(initialState);
	}

	return globalApolloClient;
};

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
const createApolloClient = (_initialState = {}) => {
	return new ApolloClient({
		uri: 'http://localhost/hivebeats/graphql',
		fetch
	});
};
