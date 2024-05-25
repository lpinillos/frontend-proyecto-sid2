import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import axios from "axios";

const EventsPage = () => {
    const [eventos, setEventos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        console.log("ENTRA AL SUBMITTTTTTTTT")
        event.preventDefault();
        fetchEventos(searchTerm);
    };

    const fetchEventos = (word = '') => {
        console.log("ENTRA A LO DEL FECTHHH: " + word)
        axios.get(`http://localhost:9091/api/eventos/getEventos`, {
            params: { word }
        }).then(response => {
            setEventos(response.data);
        }).catch(error => {
            console.error("Existe un error al obtener los eventos", error);
        });
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-grow p-4'>
                <form className="flex justify-center mb-4" onSubmit={handleSubmit}>
                    <input type="text" name="word" className="form-control border border-gray-300 rounded-l-md px-4 py-2 w-96" id="word" value={searchTerm} onChange={handleInputChange} placeholder="Digite el valor a buscar..." required />
                    <input type="submit" className=" border border-gray-700 border-x-2 border-y-2 text-black px-4 py-2 rounded-r-md hover:text-white hover:bg-gray-700" value='buscar'/>
                    <Link to='/CrearEvento' className='bg-gray-700 text-white font-semibold flex justify-center items-center w-36 rounded-md'>Crear Evento</Link>
                </form>
                {Array.isArray(eventos) && eventos.length > 0 ? (
                    <div className='flex flex-wrap justify-center'>
                        {eventos.map(evento => (
                            <div key={evento.id} className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-lg shadow-md border border-gray-800 hover:scale-105 transition-all mx-4 mb-8">
                                <div className="block relative h-48 rounded">
                                    <img className="object-cover object-center w-full h-full block" src="" alt={evento.titulo} />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-black font-semibold text-xs tracking-widest title-font mb-1">Plan de Viaje</h3>
                                    <h2 className='text-black text-xs tracking-widest title-font mb-1'>{evento.fecha}</h2>
                                    <h2 className="text-black title-font text-lg font-medium hover:text-hover-orange"><Link to={`/InfoPlanView/${evento.id}`}>{evento.titulo}</Link></h2>
                                    <p className="mt-1">{evento.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-4">No hay eventos disponibles</p>
                )}
            </div>
        </div>
    );
}

export default EventsPage;
