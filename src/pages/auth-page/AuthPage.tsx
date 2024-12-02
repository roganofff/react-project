import React, { FormEvent, useState } from 'react';
import { Informer } from '@consta/uikit/Informer';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../services/token';
import { UserAuthAPI } from '../../const';

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const getUserToken = async (user: string, pass: string): Promise<string> => {
        const response = await fetch(UserAuthAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            password: pass,
            expiresInMins: 60,
        }),
        });

        if (!response.ok) {
        throw new Error('Неверные данные пользователя!');
        }

        const { accessToken } = await response.json();
        return accessToken;
    };

    try {
        const token = await getUserToken(username, password);
        saveToken(token);
        navigate('/profile');
    } catch (err) {
        setError((err as Error).message);
    }
    };

    return (
    <form onSubmit={onFormSubmit} style={{ width: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Поле ввода логина */}
        <div style={{ marginBottom: '16px', width: '100%' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '8px' }}>
            Логин:
        </label>
        <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #ccc' }}
            placeholder="Введите логин"
        />
        </div>

        {/* Поле ввода пароля */}
        <div style={{ marginBottom: '16px', width: '100%' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>
            Пароль:
        </label>
        <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #ccc' }}
            placeholder="Введите пароль"
        />
        </div>

        {/* Отображение ошибки, если она есть */}
        {error && (
        <div style={{ marginBottom: '16px' }}>
            <Informer status="alert" view="filled" title="Ошибка" label={error} />
        </div>
        )}

        {/* Кнопка отправки формы */}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
        <button type="submit" style={{ backgroundColor: 'white', border: '2px solid black', padding: '8px 16px', borderRadius: '5px', color: "black" }}>
            Вход
        </button>
        </div>
    </form>
    );
};

export default AuthPage;