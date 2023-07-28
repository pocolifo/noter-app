"use client";

import { useEffect, useState } from 'react';

import { StyleRegistry } from 'styled-jsx'
import styles from './notification.module.css'

import { NotificationProps } from '@/app/lib/interfaces';
import { useNotificationContext } from './notificationcontext'
import { Icon } from '@iconify/react';

export default function NotificationHandler() {
    const notificationContext = useNotificationContext();
    const [index, setIndex] = useState(1);

    function click() {
        notificationContext.fire({
            title: index.toString(),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at dui lacus.',
            type: 'alert'
        })

        console.log(index)
        setIndex(index + 1)
    }

    return (
        <div className={styles.section}>
            <button onClick={click}> hi </button>

            {
                Object.entries(notificationContext.queue).map(([key, value]) => (
                    <Notification
                        data={value}
                        id={key}
                    />
                ))
            }
        </div>
    );
}

function Notification(props: {data: NotificationProps, id: string}) {
    const notificationContext = useNotificationContext();
    
    const colorMap: {[key: string]: string} = {
        error: '#f27474',
        success: '#a5dc86',
        alert: '#3fc3ee'
    };

    function handleDelete() {
        notificationContext.delete(props.id);
    }

    useEffect(() => {
        (async () => {
            await new Promise(() => setTimeout(handleDelete, 5000))
        })()
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.bar} style={{ backgroundColor: colorMap[props.data.type]} }/>

            <div className={styles.header}>
                <p className={styles.title}> {props.data.title} </p>
                <Icon
                    icon='fe:close'
                    color='#FFFFFF'
                    className={styles.close}
                    onClick={handleDelete}
                />
            </div>

            <p className={styles.description}> {props.data.description} </p>
        </div>
    );
}