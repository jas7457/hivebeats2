import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import theme from '../../theme';

export default function Header() {
	return (
		<StyledHeader className="flex-no-shrink">
			<div>I am a temporary header, just here for layout purposes</div>
			<div>
				<Link href="/">
					<a>Link to index</a>
				</Link>
			</div>

			<div>
				<Link href="/about">
					<a>Link to about</a>
				</Link>
			</div>
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	background-color: ${theme.colors.primary.main};
	padding: ${theme.dimensions['2']};
`;
