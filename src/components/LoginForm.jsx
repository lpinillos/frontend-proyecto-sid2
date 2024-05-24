import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navegate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === 'luis' && password === 'luispi123') {
            console.log("Ingreso Exitoso")
            navegate('/Events')
        } else {
            setErrorMessage("Usuario o contraseña incorrectos");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <input type="text" placeholder='Ingrese su usuario' className='w-full h-10 mb-10 pl-4 border-transparent neumorphism-input' value={username} onChange={handleUsername} />
                <input type="password" placeholder='Ingrese su contraseña' className='w-full h-10 mb-10 pl-4 neumorphism-input' value={password} onChange={handlePassword} />
                {errorMessage && (<div className='text-red-500 mb-4'>{errorMessage}</div>)}
                <button type='submit' onSubmit={handleSubmit} className='w-52 h-10 rounded-xl mt-10 border-none neumorphism-button'>Ingresar</button>
            </form>
        </>
    )
}

export default LoginForm