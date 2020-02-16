import React from 'react';

export default function ResponsiveImage(props: ResponsiveImageProps) {
	const { sourceUrl, srcSet, altText } = props;

	return <img src={sourceUrl || undefined} alt={altText || ''} srcSet={srcSet || undefined} />;
}

interface ResponsiveImageProps {
	sourceUrl: string | null;
	srcSet?: string | null;
	altText?: string | null;
}
