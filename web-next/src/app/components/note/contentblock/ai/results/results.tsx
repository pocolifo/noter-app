import { useEffect, useState } from 'react';
import styles from './results.module.css';

export default function Results(props: { correct: number; wrong: number; total: number }) {
	const circleProps = {
		cx: 16,
		cy: 16,
		r: 12,
		strokeWidth: 8,
		fill: 'none'
	};

	const [animate, setAnimate] = useState(true);
	useEffect(() => {
		if (animate) setAnimate(false);
	}, [animate]);

	// circumfrence of the circle
	const C = 2 * Math.PI * 12;

	return (
		<div className={styles.container}>
			<svg width={32} height={32} viewBox="0 0 32 32" className={styles.svg}>
				<circle stroke={'#383838'} {...circleProps} />
				<circle
					stroke={'#fb7185'}
					{...circleProps}
					style={{
						strokeDasharray: animate
							? `0 ${C}`
							: `${(C * (props.wrong + props.correct)) / props.total} ${C}`,
						transition: 'stroke-dasharray 1s ease'
					}}
				/>
				<circle
					stroke={'#34d399'}
					{...circleProps}
					style={{
						strokeDasharray: animate
							? `0 ${C}`
							: `${(C * props.correct) / props.total} ${C}`,
						transition: 'stroke-dasharray 1s ease'
					}}
				/>
			</svg>

			<div className={styles.stats}>
				<p style={{ fontWeight: 700, fontSize: '30px' }}>
					{Math.round((props.correct * 100) / props.total)}%
				</p>
			</div>
		</div>
	);
}
