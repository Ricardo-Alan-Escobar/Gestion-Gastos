import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Bell, CircleCheckBig  } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

interface Notificacion {
    id: number;
    titulo: string;
    mensaje: string;
    leido: boolean; 
    created_at: string;
}

export default function Notificaciones() {
    const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

   
    const fetchNotificaciones = async () => {
        try {
            const res = await axios.get('/api/notificaciones');
            setNotificaciones(res.data);
        } catch (error) {
            console.error('Error al obtener notificaciones', error);
        }
    };

    useEffect(() => {
        fetchNotificaciones();
    }, []);

  
    const marcarLeidas = async () => {
        try {
            await axios.post('/api/notificaciones/leidas');
            setNotificaciones([]);
        } catch (error) {
            console.error('Error al marcar como leídas', error);
        }
    };

    
    const eliminarNotificacion = async (id: number) => {
    const confirmacion = await Swal.fire({
        title: '¿Marcar como leida?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, leer',
        cancelButtonText: 'Conservar',
        background: '#171717',
        color: '#fff',
        customClass: {
            popup: 'text-sm rounded-md shadow-lg border-2 border-yellow-500',
        },
    });

    if (!confirmacion.isConfirmed) return;

    try {
        await axios.delete(`/api/notificaciones/${id}`);
        setNotificaciones((prev) => prev.filter((n) => n.id !== id));

        Swal.fire({
            title: 'Notificación Leída',
            icon: 'success',
            timer: 2000,
            toast: true,
            position: 'top-end',
            background: '#171717',
            color: '#fff',
            showConfirmButton: false,
            customClass: {
                popup: 'text-sm rounded-md shadow-lg border-2 border-green-500',
            }
        });
    } catch (error) {
        Swal.fire({
            title: 'Error al leer',
            text: 'No se pudo leer la notificación.',
            icon: 'error',
            timer: 2500,
            toast: true,
            position: 'top-end',
            background: '#171717',
            color: '#fff',
            showConfirmButton: false,
            customClass: {
                popup: 'text-sm rounded-md shadow-lg border-2 border-red-500',
            }
        });
    }
};

    return (
        <AppLayout breadcrumbs={[{ title: 'Notificaciones', href: '/notificaciones' }]}>
            <Head title="Notificaciones" />
            <div className="p-4 m-4 rounded-xl bg-white dark:bg-neutral-800">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center"><Bell className='mr-2' /> Notificaciones</h2>
                    
                </div>

                <ul className="space-y-2">
                    {notificaciones.length === 0 && <li>No hay notificaciones.</li>}
                    {notificaciones.map((n) => (
                        <li
                            key={n.id}
                            className={`p-3 rounded-md border flex justify-between items-start ${
                                n.leido
                                    ? 'bg-gray-500 text-gray-600'
                                    : 'bg-[#171717] border-gray-600 hover:bg-[#0a0a0a] hover:text-white'
                            }`}
                        >
                            <div>
                                <strong>{n.titulo}</strong>
                                <p>{n.mensaje}</p>
                                <span className="text-xs text-gray-400 hover:text-white">
                                    {new Date(n.created_at).toLocaleString()}
                                </span>
                            </div>
                            <button
                                onClick={() => eliminarNotificacion(n.id)}
                                className="ml-4 text-green-400 hover:text-green-600 cursor-pointer"
                                title="Leer notificación"
                            >
                                <CircleCheckBig  size={25} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
