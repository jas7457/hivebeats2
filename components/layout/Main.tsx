import React from 'react';
import styled from 'styled-components';

import theme from '../../theme';

export default function Main({ children }: { children: React.ReactNode }) {
	return <StyledMain className="flex-grow flex-shrink overflow-y-auto">{children}</StyledMain>;
}

const StyledMain = styled.main`
	margin: ${theme.dimensions['2']};
`;
