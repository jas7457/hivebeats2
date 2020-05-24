import React, { useEffect } from 'react';

/**
 * Listens to clicks outside of a given reference element and calls a callback when a click is registered
 */
export default function useClickOutside(ref: React.MutableRefObject<HTMLElement | undefined>, callback: (e: Event) => void) {
	useEffect(() => {
		const current = ref.current;
		if (!current) {
			return;
		}

		function handler(event: Event) {
			if (current && !current.contains(event.target as HTMLElement)) {
				callback(event);
			}
		}

		// Important: use mousedown and not click - can cause bug with the DynamicDate Select component closing the Popover prematurely
		document.addEventListener('mousedown', handler);
		document.addEventListener('touchstart', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
			document.removeEventListener('touchstart', handler);
		};
	}, [callback]);
}
