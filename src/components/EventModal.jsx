import { useEffect, useState } from "react";
import updateEvent from "../services/updateEvent";
import getEventById from "../services/myEvents";
import { Link } from "react-router-dom";
import saveComment from "../services/saveComment";
import { FaUser } from "react-icons/fa";
import getFacultadById from "../services/getFacultadById";
import getProgramaById from "../services/getProgramaById";
import { FaCarTunnel } from "react-icons/fa6";

const EventModal = ({ show, onClose, event, onEdit, onMsg }) => {
  const [comments, setComments] = useState(event.comentarios || []);
  const [suscribe, setSuscribe] = useState(false);
  const [facultades, setFacultades] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [conferencistas, setConferencistas] = useState([]);
  const [facilitadores, setFacilitadores] = useState([]);
  const [newComment, setNewComment] = useState({
    comentario: "",
    eventId: "",
    userId: "",
  });

  let user = JSON.parse(localStorage.getItem("user"));

  const handleCommentChange = (e) => {
    setNewComment({
      ...newComment,
      comentario: e.target.value,
    });
  };

  useEffect(() => {
    const conferencistasActuales = event.participantes.filter((participante) => {
      return participante.role === "conferencista";
    });
    setConferencistas(conferencistasActuales);
  }, [event]);

  useEffect(() => {
    const facilitadoresActuales = event.participantes.filter((participante) => {
      return participante.role === "facilitador";
    });
    setFacilitadores(facilitadoresActuales);
  }, [event]);

  useEffect(() => {
    setComments(event.comentarios || []);
  }, [event.comentarios, onClose]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let facultades = [];
        for (let i = 0; i < event.facultades.length; i++) {
          const facultad = await getFacultadById(event.facultades[i]);
          facultades.push(facultad);
        }
        setFacultades(facultades);
      } catch (error) {
        setFacultades([]);
      }
    };

    fetchData();
  }, [event.facultades]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let programas = [];
        for (let i = 0; i < event.programas.length; i++) {
          const programa = await getProgramaById(event.programas[i]);
          programas.push(programa);
        }
        setProgramas(programas);
      } catch (error) {
        setFacultades([]);
      }
    };

    fetchData();
  }, [event.programas]);

  const handleAddComment = () => {
    let fecha = new Date();
    let año = fecha.getFullYear();
    let mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    let dia = ("0" + fecha.getDate()).slice(-2);

    let fechaFormateada = `${año}-${mes}-${dia}`;

    if (newComment.comentario.trim() !== "") {
      const commentToAdd = {
        contenido: newComment.comentario,
        username: user.nombre,
        fecha: fechaFormateada,
        eventId: event.id,
        userId: user.id,
      };

      const response = saveComment(event.id, commentToAdd);

      if (response) {
        setComments((prevComments) => [...prevComments, commentToAdd]);

        event.comentarios = [...(event.comentarios || []), commentToAdd];

        setNewComment({
          comentario: "",
          eventId: "",
          userId: "",
        });
      }
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

      const participanteExistente = participantesActuales.some(
        (participante) => participante.id === user.id
      );

      if (!participanteExistente) {
        const nuevoParticipante = {
          id: user.id,
          usuario: user,
          role: "asistente",
        };

        const nuevosParticipantes = [
          ...participantesActuales,
          nuevoParticipante,
        ];

        const response = await updateEvent(eventToUpdate.id, {
          ...eventToUpdate,
          participantes: nuevosParticipantes,
        });

        if (response) {
          setSuscribe(true);
          onMsg("Inscripción exitosa");
          handleClose();
        }
      } else {
        const response = await updateEvent(eventToUpdate.id, {
          ...eventToUpdate,
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

      const nuevosParticipantes = participantesActuales.filter(
        (p) => p.id !== user.id
      );

      const response = await updateEvent(eventToUpdate.id, {
        ...event,
        participantes: nuevosParticipantes,
      });

      if (response) {
        setSuscribe(false);
        onMsg("Anulación exitosa");
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setProgramas([]);
    setFacultades([]);
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
            <div className="flex gap-3 mb-3">
              {event.categoria.map((categoria, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-gray-800 px-2 py-1 rounded-full text-sm"
                >
                  {categoria}
                </span>
              ))}
            </div>
            <div className="block relative h-64 rounded overflow-hidden">
              <img
                className="object-cover object-center w-full h-full block"
                src={event.imagen || "default-image-url.jpg"}
                alt={event.titulo}
              />
            </div>
            <div className="mt-4">
              <h2 className="text-black text-xs tracking-widest title-font mb-1">
                {event.fecha}
              </h2>
              <h2 className="text-black title-font text-lg font-medium">
                {event.titulo}
              </h2>
              <p className="mt-1 text-gray-700">{event.descripcion}</p>
              <section className="flex justify-between gap-2">
                {facultades.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-black text-lg font-medium mb-4">
                      Facultades
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {facultades.map((facultad, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                        >
                          {facultad.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {programas.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-black text-lg font-medium mb-4">
                      Programas
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {programas.map((facultad, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                        >
                          {facultad.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
              <section className="flex justify-between gap-2">
                {conferencistas.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-black text-lg font-medium mb-4">
                      Conferencistas
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {conferencistas.map((participante, index) =>
                        participante.role === "conferencista" ? (
                          <span
                            key={index}
                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                          >
                            {participante.usuario.nombre}
                          </span>
                        ) : null
                      )}
                    </div>
                  </div>
                )}
                {facilitadores.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-black text-lg font-medium mb-4">
                      Facilitadores
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {facilitadores.map((participante, index) =>
                        participante.role === "facilitador" ? (
                          <span
                            key={index}
                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                          >
                            {participante.usuario.nombre}
                          </span>
                        ) : null
                      )}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
          <div className="w-1/2 p-6 flex flex-col">
            <h2 className="text-black text-lg font-medium mb-4">Comentarios</h2>
            <div
              className="flex-grow overflow-y-auto mb-4 pr-2"
              style={{ maxHeight: "300px" }}
            >
              {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-4 mb-4 border rounded-lg shadow-sm bg-white"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                          <span className="text-lg font-semibold">
                            {comment.username.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-gray-900">
                            {comment.username}
                          </p>
                          <p className="text-sm text-gray-500">
                            {comment.fecha}
                          </p>
                        </div>
                        <p className="mt-2 text-gray-700">
                          {comment.contenido}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No hay comentarios aún.</p>
              )}
            </div>
            <div className="flex">
              <input
                className="flex-grow h-10 p-2 border border-gray-400 rounded-l-md"
                type="text"
                value={newComment.comentario}
                onChange={handleCommentChange}
                placeholder="Añadir un comentario"
              />
              <button
                onClick={handleAddComment}
                className="h-10 px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-700"
              >
                Enviar
              </button>
            </div>
            <div className="flex gap-3">
              {user && user.rol === "ADMIN" && (
                <Link className="w-full" to={`/InfoPlanView/${event.id}`}>
                  <button className="mt-4 h-10 w-full bg-yellow-500 text-white rounded-md hover:bg-yellow-700">
                    Editar Evento
                  </button>
                </Link>
              )}
              {new Date(event.fecha) > new Date() &&
                (suscribe ? (
                  <button
                    className="mt-4 w-full h-10 bg-red-500 hover:bg-red-700 text-white rounded-md"
                    onClick={() => handleDesuscribe(event, user)}
                  >
                    Anular
                  </button>
                ) : (
                  <button
                    className="mt-4 w-full h-10 bg-green-500 text-white rounded-md hover:bg-green-700"
                    onClick={() => handleSubscribe(event, user)}
                  >
                    Inscribirse
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-300 text-right flex justify-between items-center">
          <div className="flex items-center">
            <FaUser className="text-gray-600" />
            <p className="text-gray-600 ml-2">
              {event.participantes?.length || 0} Participantes
            </p>
          </div>
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
