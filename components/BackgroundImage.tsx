import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

export default function BackgroundImage(props: BackgroundImageProps) {
	const { src, className, title, children, onClick, altText } = props;

	return (
		<StyledBackgroundImage
			className={classNames('relative w-full', className)}
			title={title}
			style={{ backgroundImage: `url(${src})` }}
			onClick={onClick}
			aria-label={altText || undefined}
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
	src: string;
	children?: React.ReactNode;
	className?: string;
	title?: string;
	altText?: string | null;
	onClick?: (e: React.MouseEvent) => void;
}
