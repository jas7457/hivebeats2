import React, { useState, useEffect, useRef, useCallback, CSSProperties } from 'react';
import classNames from 'classnames';

export default function Slider(props: SliderProps) {
	const { value, handleValueChange, className, style } = props;
	const [isSeeking, setIsSeeking] = useState(false);
	const [localValue, setLocalValue] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const displayValue = isSeeking ? localValue : value;

	const equateLocalValue = useCallback((e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
		const rect = containerRef.current!.getBoundingClientRect();
		const percentage = (() => {
			if (e.clientX <= rect.left) {
				return 0;
			}
			if (e.clientX >= rect.width + rect.left) {
				return 100;
			}
			return ((e.clientX - rect.left) / rect.width) * 100;
		})();

		setLocalValue(percentage);
	}, []);

	function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
		// prevent default so that moving the mouse around the screen does not highlight text
		e.preventDefault();
		setIsSeeking(true);
		equateLocalValue(e);
	}

	useEffect(() => {
		const handleTouchMove = (e: MouseEvent) => {
			if (!isSeeking) {
				return;
			}
			equateLocalValue(e);
		};
		const handleMouseEnter = (e: MouseEvent) => {
			// If the slider was being interacted with but the mouse went off the window
			// and then re-entered while unclicked then end the interaction.
			//
			// In Firefox, the event can be triggered when a new DOM node is inserted and hovered.
			// We need to make sure that the relatedTarget (The EventTarget the pointing device exited from)
			// is not null (it should be the html element)
			if (e.buttons === 0 && e.relatedTarget !== null) {
				handleTouchEnd();
			}
		};
		const handleTouchEnd = () => {
			if (!isSeeking) {
				return;
			}
			handleValueChange(localValue);
			setIsSeeking(false);
		};

		document.body.addEventListener('mousemove', handleTouchMove);
		document.body.addEventListener('mouseenter', handleMouseEnter);
		document.body.addEventListener('mouseup', handleTouchEnd);
		return () => {
			document.body.removeEventListener('mousemove', handleTouchMove);
			document.body.removeEventListener('mouseenter', handleMouseEnter);
			document.body.removeEventListener('mouseup', handleTouchEnd);
		};
	}, [isSeeking, localValue, equateLocalValue, handleValueChange]);

	return (
		<>
			<div className={classNames('cursor-pointer py-2', className)} style={style} onMouseDown={handleMouseDown} ref={containerRef}>
				<div className="flex h-1 items-center">
					<div className="bg-primary h-full" style={{ width: `${displayValue}%` }} />
					<div className={classNames('relative bg-primary h-4 w-4 rounded-full hover:scale-md', { 'scale-md': isSeeking })} />
					<div className="bg-grey-light h-full flex-grow" />
				</div>
			</div>
		</>
	);
}

interface SliderProps {
	className?: string;
	style?: CSSProperties;
	value: number;
	handleValueChange: (value: number) => void;
}
