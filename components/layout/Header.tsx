import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export default function Header() {
	return (
		<StyledHeader className="flex-no-shrink">
			<Link href="/">
				<a>Link to index</a>
			</Link>
			<Link href="/about">
				<a>Link to about</a>
			</Link>
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	height: 200px;
`;
