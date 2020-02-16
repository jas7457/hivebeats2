import React from 'react';
import styled from 'styled-components';

export default function Footer() {
	return <StyledFooter className="flex-no-shrink">I am the footer!</StyledFooter>;
}

const StyledFooter = styled.footer`
	height: 200px;
`;
