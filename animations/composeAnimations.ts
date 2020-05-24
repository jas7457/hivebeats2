export default function composeAnimations(...animations: AnimationInterface[]): AnimationInterface {
	return animations.reduce(
		(memo, animation) => {
			return {
				...memo,
				...animation
			};
		},
		{ from: {}, to: {} }
	);
}

export interface AnimationInterface {
	from: object;
	to: object;
}
