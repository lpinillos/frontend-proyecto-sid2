import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import getUnsplashImage from "../services/unSplash";
import Modal from '../components/Modal';
import EventModal from '../components/EventModal';
import getEventById from '../services/myEvents';

const MyEvents = () => {
    const [eventosConImagen, setEventosConImagen] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filterData, setFilterData] = useState("");
    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [msgEvent, setMsgEvent] = useState(null);

    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (msgEvent) {
            const timer = setTimeout(() => {
                setMsgEvent(null);
            }, 2000); // 5000 ms = 5 segundos
            return () => clearTimeout(timer); 
        }
    }, [msgEvent]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getEventById(user.id);
                const eventosConImagenTemp = await Promise.all(response.map(async (evento) => {
                    const imagen = await getUnsplashImage(evento.titulo);
                    return { ...evento, imagen };
                }));
                setEventosConImagen(eventosConImagenTemp);
            } catch (error) {
                setEventosConImagen([]);
            }
        };

        fetchData();
    }, [user.id]);

    useEffect(() => {
        const filtered = eventosConImagen.filter(item => {
            const titleMatch = item.titulo.toLowerCase().includes(titulo.toLowerCase());
            const categoriaMatch = Array.isArray(item.categoria)
                ? item.categoria.map((categoriaItem) => categoriaItem === categoria ? categoria : null)
                : [];
            return titleMatch && categoriaMatch;
        });

        setFilterData(filtered);
    }, [eventosConImagen, titulo]);

    const handleCreateEventClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCreateEvent = (newEvent) => {
        setEventosConImagen([...eventosConImagen, { ...newEvent, id: eventosConImagen.length + 1, imagen: '' }]);
        setShowModal(false);
    };

    const handleEventClick = (event) => {
        console.log(event);
        setSelectedEvent(event);
        setShowEventModal(true);
    };

    const handleCloseEventModal = () => {
        setShowEventModal(false);
    };

    const handleEditEvent = () => {
        alert("Editar evento");
    };

    return (
        <div className=''>
            <Sidebar />
            <div className="ml-80">
            </div>
            <div className='flex-grow p-4 ml-72'>
                <div className='flex justify-end'>
                    <input type="text" placeholder="Titulo del Evento" className="w-3/4 h-10 mr-4 p-2 border border-black rounded-md" value={titulo} onChange={e => setTitulo(e.target.value)} />
                    <input type="text" placeholder="Categoria" className="w-2/5 h-10 mr-8 p-2 border border-black rounded-md" value={categoria} onChange={e => setCategoria(e.target.value)} />
                    <button onClick={handleCreateEventClick} className='w-36 h-10 border bg-gray-700 text-white font-semibold hover:bg-gray-900 rounded-lg mb-10 flex justify-center items-center'>Crear Evento</button>
                </div>
                {Array.isArray(eventosConImagen) && eventosConImagen.length > 0 ? (
                    <div className='flex flex-wrap justify-center'>
                        {filterData.map(evento => (
                            <div
                                key={evento.id}
                                className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-lg shadow-md border border-gray-800 hover:scale-105 transition-all mx-4 mb-8"
                                onClick={() => handleEventClick(evento)}
                            >
                                <div className="block relative h-48 rounded">
                                    <img className="object-cover object-center w-full h-full block" src={evento.imagen || 'default-image-url.jpg'} alt={evento.titulo} />
                                </div>
                                <div className="mt-4">
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
                <Modal show={showModal} onClose={handleCloseModal} onCreate={handleCreateEvent} />
                {selectedEvent && (
                    <EventModal
                        show={showEventModal}
                        onClose={handleCloseEventModal}
                        event={selectedEvent}
                        onEdit={handleEditEvent}
                        onMsg={setMsgEvent}
                    />
                )}
            </div>
            {
                msgEvent && (
                    <div
                    className={`fixed text-center right-0 bottom-0 mb-10 mr-10 block w-[250px] p-4 text-base leading-5 text-white ${msgEvent === "Anulación exitosa" ? 'bg-red-500' : 'bg-green-500'} rounded-lg opacity-100 font-regular`}>
                        {msgEvent}
                  </div>
                )
            }
        </div>
    );
}

export default MyEvents