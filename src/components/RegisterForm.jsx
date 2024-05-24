import React from 'react'

const RegisterForm = () => {
    return (
        <>
            <div className='flex flex-row w-full'>
                {/*PRIMERA COLUMNA*/}
                <div className='flex flex-col w-1/2 h-72 items-center justify-center'>
                    <input type="text" placeholder='Ingrese su cédula' className='w-96 h-10 mb-5 pl-4 border-transparent neumorphism-input' />
                    <input type="text" placeholder='Ingrese su nombre' className='w-96 h-10 mb-5 pl-4 border-transparent neumorphism-input' />
                    <input type="text" placeholder='Ingrese su apellido' className='w-96 h-10 mb-5 pl-4 border-transparent neumorphism-input' />
                    <input type="text" placeholder='Ingrese su ciudad de origen' className='w-96 h-10 mb-5 pl-4 border-transparent neumorphism-input' />
                    <input type="text" placeholder='Ingrese su relación con la institución' className='w-96 h-10 mb-5 pl-4 border-transparent neumorphism-input' />
                </div>

                {/*SEGUNDA COLUMNA*/}
                <div className='flex flex-col w-1/2 h-72 items-center justify-center'>
                    <input type="text" placeholder='Ingrese su nombre de usuario' className='w-96 h-10 mb-5 pl-4 border-transparent neumorphism-input' />
                    <input type="text" placeholder='Ingrese su correo electrónico' className='w-96 h-10 mb-5 pl-4 border-transparent neumorphism-input' />
                    <input type="password" placeholder='Ingrese su contraseña' className='w-96 h-10 mb-5 pl-4 neumorphism-input' />
                    <input type="password" placeholder='Confirme su contraseña' className='w-96 h-10 mb-5 pl-4 neumorphism-input' />
                    <div className='flex justify-end'>
                        <button type='submit' className='w-52 h-10 rounded-xl border-none neumorphism-button transition-all'>Registrarse</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterForm