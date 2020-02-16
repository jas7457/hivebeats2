import React from 'react';
import styled from 'styled-components';

export default function Main({ children }: { children: React.ReactNode }) {
	return <StyledMain className="flex-grow flex-shrink">{children}</StyledMain>;
}

const StyledMain = styled.main``;
