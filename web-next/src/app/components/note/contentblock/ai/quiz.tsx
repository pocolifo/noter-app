import { QuizQuestion } from "@/app/lib/interfaces";
import { generateQuiz } from "@/app/lib/api";
import { useEffect, useState } from "react";

import aiStyles from "./ai.module.css"
import contentBlockStyles from "../contentblock.module.css"

export default function Quiz(props: { questions: QuizQuestion[], noteID: string }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const [questions, setQuestions] = useState<QuizQuestion[]>(props.questions === undefined ? [] : props.questions)
    const [loading, setLoading] = useState(props.questions === undefined)
    const [reveal, setReveal] = useState(false)
    const [solved, setSolved] = useState<Array<number>>([])
    const [correct, setCorrect] = useState(0)

    useEffect(() => {
        if (!loading) return

        generateQuiz(props.noteID, 4)
            .then((data) => {
                setQuestions(data)
                setLoading(false)
            })
    }, [loading])

    useEffect(() => {
        console.log(currentQuestion)
        console.log(solved)
        solved.includes(currentQuestion) ? setReveal(true) : setReveal(false)
    }, [currentQuestion])

    function submitQuestion(n: number) {
        setReveal(true)
        setSolved([...solved, currentQuestion])
        questions[currentQuestion].correct == n && setCorrect(correct + 1)
    }

    return (
        <div className={contentBlockStyles.contentBlock}>
            <h1>Quiz</h1>
            <div className={`${aiStyles.magic} ${!loading && aiStyles.done}`}>
                {!loading &&
                    <>
                        {currentQuestion == questions.length ?
                            <>
                                <p>Results:</p>
                                <div>
                                    {correct}/{questions.length}
                                </div>
                            </> :
                            <>
                                <p>Question #{currentQuestion + 1}: {questions[currentQuestion].question}</p>
                                <ul className={aiStyles.questionContainer}>
                                    {questions[currentQuestion].options.map((option, i) => {
                                        return <li key={i}>
                                            <button
                                                // poop code
                                                className={`${aiStyles.option} ${reveal && (questions[currentQuestion].correct == i ? aiStyles.correct : aiStyles.wrong)}`}
                                                onClick={() => submitQuestion(i)}
                                                disabled={solved.includes(i)}
                                            >
                                                {option}
                                            </button>
                                        </li>
                                    })}
                                </ul>
                            </>
                        }
                        <button
                            disabled={currentQuestion == 0}
                            onClick={() => setCurrentQuestion(currentQuestion - 1)}
                        >
                            Previous
                        </button>
                        <button 
                            disabled={currentQuestion == questions.length}
                            onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        >
                            Next
                        </button>
                    </>
                }
            </div>
        </div>
    )
}