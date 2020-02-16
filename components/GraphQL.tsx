import React from 'react';
import { QueryResult } from '@apollo/react-common';

export default function GraphQL<TData = any>(props: GraphQLProps<TData>) {
	const { result, children } = props;
	const { loading, error, data } = result;

	if (loading) {
		return <>Loading</>;
	}

	if (error) {
		return <>Error</>;
	}

	if (!data) {
		return <>No data</>;
	}

	return children(data);
}

interface GraphQLProps<TData> {
	result: QueryResult<TData>;
	children: (data: TData) => JSX.Element;
}
