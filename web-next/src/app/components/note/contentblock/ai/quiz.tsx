import { QuizQuestion } from '@/app/lib/interfaces';
import { generateQuiz } from '@/app/lib/api';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Results from './results/results';

import aiStyles from './ai.module.css';
import contentBlockStyles from '../contentblock.module.css';

export default function QuizBlock(props: {
	questions: QuizQuestion[];
	noteID: string;
	save: (content: object) => void;
}) {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const [questions, setQuestions] = useState<QuizQuestion[]>(
		props.questions === undefined ? [] : props.questions
	);
	const [loading, setLoading] = useState(props.questions.length == undefined);
	const [reveal, setReveal] = useState(false);
	const [solved, setSolved] = useState<Array<number>>([]);
	const [correct, setCorrect] = useState(0);

	useEffect(() => {
		if (!loading) return;

		generateQuiz(props.noteID, 4).then((data) => {
			setQuestions(data);
			setLoading(false);

			props.save(data);
		});
	}, [loading]);

	useEffect(() => {
		solved.includes(currentQuestion) ? setReveal(true) : setReveal(false);
	}, [currentQuestion]);

	function submitQuestion(n: number) {
		setReveal(true);
		setSolved([...solved, currentQuestion]);
		questions[currentQuestion].correct == n && setCorrect(correct + 1);
	}

	function regenerate() {
		setSolved([]);
		setCorrect(0);
		setCurrentQuestion(0);
		setLoading(true);
	}

	return (
		<div className={contentBlockStyles.contentBlock}>
			<h1>Quiz</h1>
			<div className={`${aiStyles.magic} ${!loading && aiStyles.done}`}>
				{!loading && (
					<>
						{currentQuestion == questions.length ? (
							<>
								<div style={{ padding: '20px' }}>
									<Results
										correct={correct}
										wrong={solved.length - correct}
										total={questions.length}
									/>
								</div>
							</>
						) : (
							<>
								<p style={{ fontWeight: 700 }}>
									{currentQuestion + 1}. {questions[currentQuestion].question}
								</p>
								<ul className={aiStyles.questionContainer}>
									{questions[currentQuestion].options.map((option, i) => {
										return (
											<li key={i}>
												<button
													// poop code
													className={`${aiStyles.option} ${
														reveal &&
														(questions[currentQuestion].correct == i
															? aiStyles.correct
															: aiStyles.wrong)
													}`}
													onClick={() => submitQuestion(i)}
													disabled={solved.includes(currentQuestion)}
												>
													{option}
												</button>
											</li>
										);
									})}
								</ul>
							</>
						)}
						<div style={{ display: 'flex' }}>
							<button
								className={aiStyles.navButtons}
								disabled={currentQuestion == 0}
								onClick={() => setCurrentQuestion(currentQuestion - 1)}
							>
								<Icon icon="material-symbols:chevron-left" />
								Previous
							</button>
							<button
								className={aiStyles.navButtons}
								disabled={currentQuestion == questions.length}
								onClick={() => setCurrentQuestion(currentQuestion + 1)}
							>
								Next
								<Icon icon="material-symbols:chevron-left" rotate={2} />
							</button>
							{currentQuestion == questions.length && (
								<button
									className={aiStyles.navButtons}
									onClick={() => regenerate()}
								>
									<Icon icon="material-symbols:refresh" />
									Regenerate
								</button>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
