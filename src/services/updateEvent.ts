import axios from "./axios";

const PUT_EVENT_URL = 'eventos/updateEvents'

export default async function updateEvent(idEvent, event) {

    try {
        console.log('event', event.participantes);
        const response = await axios.put(PUT_EVENT_URL + '/' + idEvent, event);
        return response.data;
    } catch (error) {
        console.error('Error al obtener facultades:', error);
        throw error;
    }
}