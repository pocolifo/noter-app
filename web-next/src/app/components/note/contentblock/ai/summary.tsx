import { useEffect, useState } from "react";
import contentBlockStyles from "../contentblock.module.css"
import aiStyles from "./ai.module.css"
import { Icon } from "@iconify/react";

interface SummaryProps {
    save: (content: object) => void

    bulletData: string;
    sentenceData: string;
    lastGeneratedHash: string; // the note content it was last generated from
    noteID: string;
}

export default function SummaryBlock(props: SummaryProps) {
    const [mode, setMode] = useState<'bullets' | 'sentences'>('bullets')
    const [loading, setLoading] = useState(true)

    const [bulletData, setBulletData] = useState(props.bulletData ?? '')
    const [sentenceData, setSentenceData] = useState(props.sentenceData ?? '')

    function summarize() {
        // dummy code API function
        mode === 'bullets' ? 
        setBulletData('- bullet') : setSentenceData('sentences sentences blah blah yap yap')

        props.save({
            bulletData: bulletData,
            sentenceData: sentenceData,
            lastGeneratedHash: props.lastGeneratedHash // do we need this?
        })
    }

    useEffect(() => {
        if (mode === 'bullets' && bulletData === '') {
            setLoading(true)
            summarize()
        } else if (mode === 'sentences' && sentenceData === '') {
            setLoading(true)
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
                <p>{mode === 'bullets' ? bulletData : sentenceData}</p>
            </div>
        </div>
    )
}