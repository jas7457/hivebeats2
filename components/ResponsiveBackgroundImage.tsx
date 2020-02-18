import React, { useLayoutEffect, useState, useRef } from 'react';
import BackgroundImage, { BackgroundImageProps } from './BackgroundImage';

export default function ResponsiveBackgroundImage(props: ResponsiveBackgroundImageProps) {
	const { src, srcSet, children } = props;

	const [currentSrc, setCurrentSrc] = useState(src);
	const imageRef = useRef<HTMLImageElement | null>(null);

	useLayoutEffect(() => {
		if (!srcSet || !imageRef.current) {
			return;
		}

		const img = imageRef.current;

		const onLoad = () => setCurrentSrc(img.currentSrc || img.src);
		img.addEventListener('load', onLoad);
		return () => img.removeEventListener('load', onLoad);
	}, [src, srcSet]);

	return (
		<BackgroundImage {...props} src={currentSrc}>
			<img ref={imageRef} className="display-none" src={src} srcSet={srcSet || undefined} alt="" />
			{children}
		</BackgroundImage>
	);
}

interface ResponsiveBackgroundImageProps extends BackgroundImageProps {
	srcSet?: string | null;
}
