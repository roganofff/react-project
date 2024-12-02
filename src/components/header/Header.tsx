import { Button } from '@consta/uikit/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@consta/uikit/Layout';
import Menu from '../menu/Menu';
import React from 'react';
import style from "./Header.module.css";
import { getToken, dropToken } from "../../services/token";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


const Header = () => {
    const user = useSelector((state: RootState) => state.user);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dropToken();
        navigate("/");
    };

    return (
        <Layout className={style.Header}>
            <Menu />
            <div className={style.rightBlock}>
                <NavLink to='/profile'>
                    <Button
                        view={pathname === "/profile" ? "primary" : "secondary"}
                        label={user?.firstName + " " + user?.lastName}
                    />
                </NavLink>
                <NavLink to='/login'>
                    {getToken() ? (
                        <Button
                            className={style.purpleButton} 
                            view="secondary"
                            onClick={handleLogout}
                            label='Выход'
                        />
                    ) : (
                        <Button
                            className={style.purpleButton} 
                            view={pathname === "/login" ? "primary" : "secondary"}
                            label='Вход'
                        />
                    )}
                </NavLink>
            </div>
        </Layout>
    );
}

export default Header;