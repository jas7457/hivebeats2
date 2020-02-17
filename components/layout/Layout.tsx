import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function Layout(props: LayoutProps) {
	const { children } = props;

	return (
		<StyledLayout className="flex flex-column">
			<Header />
			<Main>{children}</Main>
			<Footer />
		</StyledLayout>
	);
}

const StyledLayout = styled.div`
	height: 100vh;
`;

interface LayoutProps {
	children: ReactNode;
	className?: string;
}
