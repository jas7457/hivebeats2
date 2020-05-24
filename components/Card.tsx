import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

export default function Card(props: CardProps) {
	const { padding, rounded, className, shadow = true, children } = props;

	return (
		<StyledCard className={className} padding={padding} rounded={rounded} shadow={shadow}>
			{children}
		</StyledCard>
	);
}

const StyledCard = styled.div<Pick<CardProps, 'padding' | 'rounded' | 'shadow'>>`
	background-color: white;
	box-shadow: ${props => (props.shadow ? theme.boxShadow.all : 'none')};
	padding: ${props =>
		props.padding
			? {
					sm: theme.dimensions['2'],
					md: theme.dimensions['4'],
					lg: theme.dimensions['8']
			  }[props.padding]
			: '0px'};

	border-radius: ${props =>
		props.rounded
			? {
					sm: '2px',
					md: theme.dimensions['2'],
					lg: theme.dimensions['4']
			  }[props.rounded]
			: '0px'};
`;

interface CardProps {
	padding?: 'sm' | 'md' | 'lg';
	rounded?: 'sm' | 'md' | 'lg';
	shadow?: boolean;
	className?: string;
	children: React.ReactNode;
}
