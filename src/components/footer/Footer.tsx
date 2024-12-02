import { Layout } from '@consta/uikit/Layout';
import Menu from '../menu/Menu';
import React from 'react';
import style from "./Footer.module.css"

const Footer = () => {
    return (
        <Layout className={style.Footer}>
            <Menu />
            <div>
                <p>© {new Date().getFullYear()} Sirius University</p>
            </div>
        </Layout>
    )
}

export default Footer;