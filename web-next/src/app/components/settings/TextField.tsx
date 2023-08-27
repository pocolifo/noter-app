import { Icon } from "@iconify/react";
import { HTMLInputTypeAttribute, useState } from "react";
import styles from "./TextField.module.css";
import LoadingSpinner from "../util/LoadingSpinner";

interface Props {
    label: string;
    id: string;
    onChange: (newValue: string) => Promise<void>;
    defaultValue?: string;
    type?: HTMLInputTypeAttribute;
}

enum ChangeState {
    UPDATING,
    SUCCESS,
    FAILURE,
    NEUTRAL
}

export default function TextField(props: Props) {
    const [ changeState, setChangeState ] = useState<ChangeState>(ChangeState.NEUTRAL);
    const [ statusMessage, setStatusMessage ] = useState<string | null>(null);

    async function handleChange(newValue: string) {
        setChangeState(ChangeState.UPDATING);

        try {
            await props.onChange(newValue);
            setChangeState(ChangeState.SUCCESS);
            setStatusMessage('Updated successfully');
        } catch (err) {
            // type system bullshit
            if (err instanceof Error) {
                setChangeState(ChangeState.FAILURE);
                setStatusMessage(err.message)
            }
        }
    }

    return (
        <div className={styles.outer}>
            <label htmlFor={props.id} className={styles.label}>{ props.label }</label>
            <br />
            <div>
                <input
                    id={props.id}
                    type={ props.type || 'text' }
                    onBlur={ e => handleChange(e.target.value) }
                    disabled={ changeState === ChangeState.UPDATING }
                    defaultValue={props.defaultValue}
                    className={styles.textField}
                />
            </div>
        </div>
    )
}