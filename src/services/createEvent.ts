import axios from "./axios";

const SAVE_EVENTS_URL = '/eventos/saveEvents';

export default async function saveEvents(event) {
    const idValue = Math.floor(Math.random() * 100000000);
    const idValueLugarEvento = Math.floor(Math.random() * 100000000);
    try {
        console.log("ESTE ES EL EVENTOOOOOOOOOOOOO: " + JSON.stringify(event));
        const response = await axios.post(SAVE_EVENTS_URL,
            {
                "id": idValue,
                "categoria": event.categoria,
                "titulo": event.titulo,
                "descripcion": event.descripcion,
                "fecha":event.fecha,
                "estado": event.estado,
                "lugarDelEvento": {
                      "id": idValueLugarEvento,
                      "name": event.nombreEvento,
                      "direccion" :event.direccion,
                      "city":event.city
                  },
                "facultades":event.facultadesSeleccionadas,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear el destino:', error);
        throw error;
    }
}
