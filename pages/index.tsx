import React from 'react';

import { withApollo } from '../lib/apollo';
import PostList from '../components/PostList';

function Index() {
	return (
		<div>
			<div>Hello world</div>
			<PostList />
		</div>
	);
}

export default withApollo()(Index);
