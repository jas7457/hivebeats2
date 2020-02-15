import React from 'react';

import { withApollo } from '../lib/apollo';
import PostList from '../components/PostList';

function Index() {
	return <PostList />;
}

export default withApollo()(Index);
