"use client";

import { createContext, ReactNode, useContext, useId, useState } from 'react';

import { NotificationProps } from '@/app/lib/interfaces';

interface NotificationContextProps {
    queue: {[key: string]: NotificationProps};

    fire: (_v: NotificationProps) => void;
    delete: (_id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
    queue: {},

    fire: (_v: NotificationProps) => {},
    delete: () => {}
});

export const useNotificationContext = () => useContext(NotificationContext);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [queueState, setQueueState] = useState<{[key: string]: NotificationProps}>({});
    
    function addNotification(data: NotificationProps) {
        const newId = crypto.randomUUID();

        setQueueState((prevState) => ({
            ...prevState,
            [newId]: data
        }));
    }

    function deleteNotification(id: string) {
        setQueueState((prevState) => {
            const newState = {...prevState};
            delete newState[id];

            return newState
        })
    }

    return (
        <NotificationContext.Provider value={{
            queue: queueState,

            fire: addNotification,
            delete: deleteNotification,
        }}>
            { children }
        </NotificationContext.Provider>
    )
}