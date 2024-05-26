import React, { useState } from 'react';

const EventModal = ({ show, onClose, event, onEdit }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    if (!show) {
        return null;
    }

    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            setComments([...comments, newComment]);
            setNewComment("");
        }
    };

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
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Escribe un comentario..."
                            />
                            <button
                                onClick={handleAddComment}
                                className="h-10 px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-700"
                            >
                                Enviar
                            </button>
                        </div>
                        <button
                            onClick={onEdit}
                            className="mt-4 w-full h-10 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
                        >
                            Editar Evento
                        </button>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-300 text-right">
                    <button
                        onClick={onClose}
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
