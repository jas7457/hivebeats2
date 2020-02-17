import React from 'react';

// import the main stylesheet, which imports other global stylesheets
import '../assets/css/main.scss';
import { withApollo } from '../lib/apollo';

import Layout from '../components/layout/Layout';
import PlayerProvider from '../contexts/PlayerContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
	const WrappedComponent = withApollo()(Component);
	return (
		<PlayerProvider>
			<Layout>
				<WrappedComponent {...pageProps} />
			</Layout>
		</PlayerProvider>
	);
}
