import React, { useState,useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import axios from "axios";

const EventsPage = () => {

    const [eventos, setEventos] = useState("");
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        axios.get('http://localhost:9091/api/v1/plans/getPlan').then(response => {
            setEventos(response.data);
        }).catch(error => {
            console.error("Existe un error al obtener los planes", error);
        });
    }, []);

    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='flex-grow p-4'>
                    {Array.isArray(eventos) ? (
                        eventos.map(evento => (
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-lg shadow-md border border-gray-800 border-x-2 border-y-2 hover:scale-105 transition-all mx-10 mb-8">
                                <div className="block relative h-48 rounded">
                                    <img className="object-cover object-center w-full h-full block" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-black font-semibold text-xs tracking-widest title-font mb-1">Plan de Viaje</h3>
                                    <h2 className='text-black text-xs tracking-widest title-font mb-1'>iuwediuieu</h2>
                                    <h2 className="text-black title-font text-lg font-medium hover:text-hover-orange"><Link to='/InfoPlanView'>qondoqundiuqwndiunwdiu</Link></h2>
                                    <p className="mt-1">sosdinwen</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay eventos disponibles</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default EventsPage