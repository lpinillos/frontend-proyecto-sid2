import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../services/loginUsers';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await auth(username, password);
            if (user) {
                navigate('/Events');
                console.log("Ingreso Exitoso:", user);
            } else {
                setErrorMessage("Usuario o contraseña incorrectos");
            }
            localStorage.setItem('user', JSON.stringify(user));

        } catch (error) {
            setErrorMessage("Usuario o contraseña incorrectos");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <input type="text" placeholder='Ingrese su usuario' className='w-full h-10 mb-10 pl-4 border-transparent neumorphism-input' value={username} onChange={handleUsername} />
                <input type="text" placeholder='Ingrese su contraseña' className='w-full h-10 mb-10 pl-4 neumorphism-input' value={password} onChange={handlePassword} />
                {errorMessage && (<div className='text-red-500 mb-4'>{errorMessage}</div>)}
                <button type='submit' className='w-52 h-10 rounded-xl mt-10 border-none neumorphism-button'>Ingresar</button>
            </form>
        </>
    );
}

export default LoginForm;
