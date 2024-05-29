import axios from "./axios";

const USUARIO_REGISTER_URL = 'usuarios/saveUsuario'

export default async function registerUser(user) {

    try {
        const response = await axios.post(USUARIO_REGISTER_URL,
            {
                "id": "4",
                "password": "mina",
                "rol": "VIEWER",
                "nombreUsuario": "mina2",
                "nombre": "mina",
                "tipoRelacion": "Estudiante",
                "email": "mina.mina@example.com",
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw error;
    }
}