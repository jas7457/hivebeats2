import React from 'react';
import { useSpring, animated, SpringBaseProps } from 'react-spring';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

import { AnimationInterface } from '../animations/composeAnimations';

export default function Animation(props: AnimationProps) {
	const { animation, children, className, usingIntersectionObserver = true, config, reverse = false } = props;

	const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
		intersectionOptions: {
			threshold: 0.25
		}
	});

	const style = (() => {
		if (usingIntersectionObserver) {
			return useSpring({
				config,
				reverse,
				...(isIntersecting ? animation.to : animation.from)
			});
		}
		return useSpring({
			...animation,
			config,
			reverse
		});
	})();

	return (
		<animated.div ref={ref} className={className} style={style}>
			{children}
		</animated.div>
	);
}

interface AnimationProps {
	animation: AnimationInterface;
	children: React.ReactNode;
	className?: string;
	usingIntersectionObserver?: boolean;
	config?: SpringBaseProps['config'];
	reverse?: boolean;
}
