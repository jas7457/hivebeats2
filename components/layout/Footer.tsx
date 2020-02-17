import React from 'react';
import styled from 'styled-components';

import Player from '../player/Player';

export default function Footer() {
	return (
		<StyledFooter className="flex-no-shrink">
			<Player />
		</StyledFooter>
	);
}

const StyledFooter = styled.footer``;
