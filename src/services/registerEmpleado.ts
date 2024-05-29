import axios from "./axios";

const USUARIO_REGISTER_URL = 'saveUsuarioEmpleado'

export default async function registerEmpleado() {

    try {
        const response = await axios.get(USUARIO_REGISTER_URL);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw error;
    }
}