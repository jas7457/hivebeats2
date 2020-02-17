import React from 'react';
import styled from 'styled-components';

export default function Container(props: ContainerProps) {
	const { children } = props;

	return <StyledContainer>{children}</StyledContainer>;
}

const StyledContainer = styled.div`
	margin: 0 auto;
	max-width: 1280px;
`;

interface ContainerProps {
	children: React.ReactNode;
}
