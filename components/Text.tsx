import React from 'react';

export default function Text(props: TextProps) {
	const { children, as: Tag = 'span' } = props;

	return <Tag dangerouslySetInnerHTML={{ __html: children }} />;
}

interface TextProps {
	children: string;
	as?: keyof JSX.IntrinsicElements;
}
