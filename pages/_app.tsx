// import the main stylesheet, which imports other global stylesheets
import '../assets/css/main.scss';
import { withApollo } from '../lib/apollo';

import Layout from '../components/layout/Layout';

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
	const WrappedComponent = withApollo()(Component);
	return (
		<Layout>
			<WrappedComponent {...pageProps} />
		</Layout>
	);
}
