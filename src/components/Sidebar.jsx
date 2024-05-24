import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

    return (
        <>
            <div className='w-72 bg-gray-700 h-screen flex flex-col'>
                <div className='flex-grow'>
                    <h1 className='text-white font-semibold flex justify-center pt-4 text-xl font'>Administración de Eventos</h1>
                </div>
                <ul>
                    <li>
                        <Link to='/MyEvents'>
                            <div className='text-white font-semibold px-5 py-5 text-lg hover:bg-gray-500'>
                                Mis Eventos
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/Events'>
                            <div className='text-white font-semibold px-5 py-5 text-lg hover:bg-gray-500'>
                                Eventos
                            </div>
                        </Link>
                    </li>
                    <li>
                        <div className='text-white font-semibold px-5 py-5 text-lg'>
                            Luis Pinillos
                        </div>
                    </li>
                </ul>
            </div>
        </>

    )
}

export default Sidebar