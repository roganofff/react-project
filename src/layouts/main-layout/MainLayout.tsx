import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import style from './MainLayout.module.css'
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Layout } from '@consta/uikit/Layout';
import Menu from '../../components/menu/Menu';

const MainLayout = () => {
    return (
        <Layout className={style.MainLayout}>
            <Header />
            <hr className={style.line}/>
            <Layout direction='column' flex={1} >
                <main className={style.main}>
                    <Outlet />
                </main>
            </Layout>
            <hr className={style.line}/>
            <Footer />
        </Layout>
    )
}

export default MainLayout