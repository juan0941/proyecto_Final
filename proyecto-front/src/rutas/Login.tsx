import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autentificacion/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout";
import { FormEvent, useState } from "react";
import { API_URL } from "../Autentificacion/contanst";
import { AuthResponse, AuthResponseError } from "../types/types";
import '../estilos/Login.css'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorResponse, setErrorResponse] = useState('');

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if (response.ok) {
                console.log('Inicio de sesión exitoso');
                setErrorResponse('');
                const json = (await response.json())as AuthResponse;
                

                if(json.body.accessToken && json.body.refreshToken){
                    auth.saveUser(json);
                    goTo('/dashboard');
                }

                
            } else {
                console.log('Error al iniciar sesión');
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to='/dashboard' />;
    }

    return (
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                <div className="contenedor-input">
                  <label>Usuario</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="contenedor-input">
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <button className="button" type="submit">Iniciar sesión</button>
            </form>
        </DefaultLayout>
    );
}
