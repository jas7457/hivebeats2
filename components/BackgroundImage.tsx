import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

export default function BackgroundImage(props: BackgroundImageProps) {
	const { image, className, title, children, onClick } = props;

	const _test = 'something';

	return (
		<StyledBackgroundImage
			className={classNames('relative w-full', className)}
			title={title}
			style={{ backgroundImage: `url(${image})` }}
			onClick={onClick}
		>
			{children && <div className="absolute w-full h-full">{children}</div>}
		</StyledBackgroundImage>
	);
}

const StyledBackgroundImage = styled.div`
	background-size: cover;
	background-position: center;
`;

export interface BackgroundImageProps {
	image: string;
	children?: React.ReactNode;
	className?: string;
	title?: string;
	onClick?: (e: React.MouseEvent) => void;
}
