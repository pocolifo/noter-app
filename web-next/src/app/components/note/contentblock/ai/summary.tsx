import { useEffect, useState } from "react";
import contentBlockStyles from "../contentblock.module.css"
import aiStyles from "./ai.module.css"
import { Icon } from "@iconify/react";
import { summarizeNote } from "@/app/lib/api";

interface SummaryProps {
    save: (content: object) => void

    bulletData: string[];
    sentenceData: string;
    lastGeneratedHash: string; // the note content it was last generated from
    noteID: string;
}

export default function SummaryBlock(props: SummaryProps) {
    const [mode, setMode] = useState<'bullets' | 'sentences'>('bullets')
    const [loading, setLoading] = useState(true)

    const [bulletData, setBulletData] = useState<string[]>(props.bulletData ?? [])
    const [sentenceData, setSentenceData] = useState<string>(props.sentenceData ?? '')

    async function summarize() {
        await setLoading(true)

        const summaries = await summarizeNote(props.noteID)
        setBulletData(summaries.bullets)
        setSentenceData(summaries.sentences)

        props.save({
            bulletData: summaries.bullets,
            sentenceData: summaries.sentences,
            lastGeneratedHash: props.lastGeneratedHash // do we need this?
        })

        await setLoading(false)
    }

    useEffect(() => {
        if (mode === 'bullets' && bulletData.length == 0) {
            summarize()
        } else if (mode === 'sentences' && sentenceData === '') {
            summarize()
        } else {
            setLoading(false)
        }
    }, [mode, bulletData, sentenceData])

    return (
        <div className={contentBlockStyles.contentBlock}>
            <h1>Summary
                <span className={aiStyles.toggleContainer}>
                    <button className={aiStyles.regenerate} onClick={() => summarize()}>
                        <Icon
                            icon='material-symbols:refresh'
                            color="black"
                        />
                        Regenerate
                    </button>
                    <button
                        className={aiStyles.modeToggle}
                        onClick={() => setMode('bullets')}
                        style={{ fontWeight: mode === 'bullets' ? 700 : 400 }}
                    >
                        Bullets
                    </button>
                    <button
                        className={aiStyles.modeToggle}
                        onClick={() => setMode('sentences')}
                        style={{ fontWeight: mode === 'sentences' ? 700 : 400 }}
                    >
                        Sentences
                    </button>
                </span>
            </h1>
            <div className={`${aiStyles.magic} ${!loading && aiStyles.done}`}>
                {mode === 'bullets' ?
                    <ul>
                        {
                            bulletData.map((value, i) => <li key={i}>{value}</li>)
                        }
                    </ul>
                    : <p>{sentenceData}</p>}
            </div>
        </div>
    )
}