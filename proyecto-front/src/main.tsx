import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './rutas/Login.tsx'
import Register from './rutas/Register.tsx'
import Dashboard from './rutas/Dashboard.tsx'
import ProtectedRoute from './rutas/ProtectedRoute.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './Autentificacion/AuthProvider.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path : '/dashboard',
        element: <Dashboard />,
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
