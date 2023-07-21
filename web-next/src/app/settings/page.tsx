"use client";

import { useState } from 'react'

import styles from './page.module.css'

import Navbar from './nav'
import Profile from './menus/profile'
import { PageNotFoundError } from 'next/dist/shared/lib/utils';
import { UserDataProvider } from './menus/userdatacontext';

export default function Account() {
    const pageList: {[key: string]: JSX.Element} = {
        profile: Profile(),
        test1: <div/>,
        test2: <div/>
    };

    const [currentPage, setCurrentPage] = useState<string>('profile');

    return (
        <UserDataProvider>
        <div className={styles.main}>
            <Navbar linkList={pageList} clickCallback={setCurrentPage}/>

            <div className={styles.content}>
                {pageList[currentPage]}
            </div>
        </div>
        </UserDataProvider>
    )
}