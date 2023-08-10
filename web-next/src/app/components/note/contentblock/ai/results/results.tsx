import styles from './results.module.css';

export default function Results(props: { correct: number; wrong: number; total: number }) {
	return (
		<>
			<div>
				<p>
					{props.correct} / {props.total}
				</p>
				<p>{(props.correct * 100) / props.total}%</p>
			</div>
		</>
	);
}
