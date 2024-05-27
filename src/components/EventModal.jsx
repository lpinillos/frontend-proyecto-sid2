import { useEffect, useState } from 'react';
import updateEvent from '../services/updateEvent';
import getEventById from '../services/myEvents';
import { Link } from 'react-router-dom';

const EventModal = ({ show, onClose, event, onEdit, onMsg }) => {
    const [comments, setComments] = useState([]);
    const [suscribe, setSuscribe] = useState(false);
    let user = JSON.parse(localStorage.getItem('user'));

    const [newComment, setNewComment] = useState({
        comentario: "",
        eventId: "",
        userId: ""
    });
    
    const handleAddComment = (eventId, userId) => {
        console.log(newComment);
        if (newComment.comentario.trim() !== "") {
            const commentToAdd = {
                comentario: newComment.comentario,
                eventId: eventId,
                userId: userId
            };
    
            setComments([...comments, commentToAdd]);
            setNewComment({
                comentario: "",
                eventId: "",
                userId: ""
            });
        }
    };

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const response = await getEventById(user.id);
                const isSubscribed = response.some((e) => e.id == event.id);
                setSuscribe(isSubscribed);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMyEvents();
    }, [event.id, user.id]);

    const handleSubscribe = async (eventToUpdate, user) => {
        try {
            const participantesActuales = eventToUpdate.participantes || [];
    
            // Verifica si el usuario ya está en la lista de participantes
            const participanteExistente = participantesActuales.some(participante => participante.id === user.id);
    
            if (!participanteExistente) {
                const nuevoParticipante = {
                    id: user.id,
                    usuario: user,
                    role: "asistente"
                };
    
                const nuevosParticipantes = [...participantesActuales, nuevoParticipante];
    
                const response = await updateEvent(eventToUpdate.id, {
                    ...eventToUpdate,
                    participantes: nuevosParticipantes
                });
    
                if (response) {
                    setSuscribe(true);
                    onMsg("Inscripción exitosa");
                    handleClose();
                }
            } else {
                const response = await updateEvent(eventToUpdate.id, {
                    ...eventToUpdate
                });
                if (response) {
                    setSuscribe(true);
                    onMsg("Inscripción exitosa");
                    handleClose();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDesuscribe = async (eventToUpdate, user) => {
        try {
            const participantesActuales = eventToUpdate.participantes || [];

            const nuevosParticipantes = participantesActuales.filter((p) => p.id !== user.id);

            const response = await updateEvent(eventToUpdate.id, {
                ...event,
                participantes: nuevosParticipantes
            });

            if (response) {
                setSuscribe(false);
                onMsg("Anulación exitosa");
                handleClose();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => {
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-3/4 max-w-4xl">
                <div className="flex">
                    <div className="w-1/2 p-6 border-r border-gray-300">
                        <div className="block relative h-64 rounded overflow-hidden">
                            <img className="object-cover object-center w-full h-full block" src={event.imagen || 'default-image-url.jpg'} alt={event.titulo} />
                        </div>
                        <div className="mt-4">
                            <h2 className='text-black text-xs tracking-widest title-font mb-1'>{event.fecha}</h2>
                            <h2 className="text-black title-font text-lg font-medium">{event.titulo}</h2>
                            <p className="mt-1 text-gray-700">{event.descripcion}</p>
                        </div>
                    </div>
                    <div className="w-1/2 p-6 flex flex-col">
                        <h2 className="text-black text-lg font-medium mb-4">Comentarios</h2>
                        <div className="flex-grow overflow-y-auto mb-4 pr-2" style={{ maxHeight: '200px' }}>
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <p key={index} className="border-b border-gray-300 py-2 text-gray-700">{comment}</p>
                                ))
                            ) : (
                                <p className="text-gray-600">No hay comentarios aún.</p>
                            )}
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                className="flex-grow h-10 p-2 border border-gray-400 rounded-l-md"
                                value={newComment.comment}
                                onChange={(e) => setNewComment({
                                    comentario: e.target.value,
                                    eventId: event.id,
                                    userId: user.id
                                })}
                                placeholder="Escribe un comentario..."
                            />
                            <button
                                onClick={handleAddComment}
                                className="h-10 px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-700"
                            >
                                Enviar
                            </button>
                        </div>
                        <div className='flex gap-3'>
                            {user && user.rol === "ADMIN" && (
                            <Link className='w-full' to={`/InfoPlanView/${event.id}`}>
                                <button
                                className="mt-4 h-10 w-full bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
                                >
                                    Editar Evento
                                </button>
                            </Link>
                            )}
                            {
                            suscribe ? 
                                <button
                                    className="mt-4 w-full h-10 bg-red-500 hover:bg-red-700 text-white rounded-md"
                                    onClick={() => handleDesuscribe(event, user)}
                                >
                                    Anular
                                </button>
                                : 
                                <button
                                    className="mt-4 w-full h-10 bg-green-500 text-white rounded-md hover:bg-green-700"
                                    onClick={() => handleSubscribe(event, user)}
                                >
                                    Inscribirse
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-300 text-right">
                    <button
                        onClick={handleClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
