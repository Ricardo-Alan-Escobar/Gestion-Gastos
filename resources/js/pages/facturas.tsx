import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router  } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { ChangeEvent } from 'react';
import {Button} from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

type Factura = {
    id: number;
    nombre: string;
    ruta: string;
    created_at: string;
};

interface Props {
    facturas: Factura[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Facturas',
        href: '/facturas',
    },
];

export default function Facturas({ facturas }: Props) {
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [orderFilter, setOrderFilter] = useState<'recientes' | 'antiguos' | 'ultimoMes' | 'ultimas24' | ''>('');
    const [showOptions, setShowOptions] = useState(false);



    const { data, setData, post, reset, progress, errors } = useForm({
        factura: null as File | null,
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setData('factura', file);
        } else {
            alert('Solo archivos PDF permitidos');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/facturas/upload', {
        onSuccess: () => {
            reset();

            Swal.fire({
                title: 'Archivo subido correctamente',
                text: 'Ya está disponible en tu lista de facturas.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                background: '#171717',
                color: '#fff',
                toast: true,
                position: 'top-end',
                customClass: {
                    popup: 'text-sm rounded-md shadow-lg border-2 border-green-500',
                }
            });
        },
        onError: () => {
            Swal.fire({
                title: 'Error al subir el archivo',
                text: 'Revisa que el archivo sea válido.',
                icon: 'error',
                background: '#171717',
                color: '#fff',
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false,
                customClass: {
                    popup: 'text-sm rounded-md shadow-lg border-2 border-red-500',
                }
            });
        }
    });
};


    const handleDelete = (id: number) => {
    Swal.fire({
        title: '¿Eliminar factura?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        background: '#171717',
        color: '#fff',
        iconColor: '#f87171',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        toast: true,
        position: 'top-end',
        showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation'
        },
        customClass: {
            popup: 'text-sm rounded-md shadow-lg border-2 border-red-500',
            confirmButton: 'text-sm px-4 py-2',
            cancelButton: 'text-sm px-4 py-2'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(`/facturas/${id}`, {
                onSuccess: () => {
                    Swal.fire({
                        title: 'Eliminado correctamente',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        background: '#171717',
                        color: '#fff',
                        toast: true,
                        position: 'top-end',
                        customClass: {
                            popup: 'text-sm rounded-md shadow-lg border-2 border-green-500',
                        }
                    });
                },
                onError: () => {
                    Swal.fire({
                        title: 'Error al eliminar',
                        text: 'No se pudo eliminar la factura.',
                        icon: 'error',
                        background: '#171717',
                        color: '#fff',
                        toast: true,
                        position: 'top-end',
                        timer: 2500,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'text-sm rounded-md shadow-lg border-2 border-red-500',
                        }
                    });
                }
            });
        }
    });
};



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Facturas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {/* Subida de archivo */}
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="flex flex-col  border w-full p-5 rounded-xl bg-white dark:bg-neutral-800 border-sidebar-border/70 dark:border-sidebar-border"
                >
                    <div>
                        <h1 className='text-3xl font-bold mb-2'>Facturas</h1>
                         <p>Visualiza y gestiona todas las facturas.</p>
                         <hr className="my-6 border-t-2 border-gray-500 opacity-40 rounded" />
                        <p className="text-md mb-2 mt-4 text-gray-300">Selecciona un archivo PDF</p>
                    </div>

                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="border rounded-md mb-3 p-2 px-5 dark:bg-neutral-900 dark:border-neutral-700 cursor-pointer hover:dark:bg-neutral-950 transition-colors"
                    />

                    {errors.factura && (
                        <p className="text-red-500 text-sm">{errors.factura}</p>
                    )}

                    <Button
                        type="submit"
                        className="px-5 py-5 text-sm rounded-md w-fit cursor-pointer"
                    >
                        Subir PDF
                    </Button>

                    {progress && (
                        <p className="text-sm text-gray-500 mt-5">Subiendo... {progress.percentage}%</p>
                    )}
                </form>

                {/* Lista de facturas */}
                <div className='flex flex-col gap-4 border w-full p-5 rounded-xl bg-white dark:bg-neutral-950 border-sidebar-border/70 dark:border-sidebar-border'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='w-full'>
                        <h1 className='text-2xl font-bold flex items-center'> <FileText className='mr-2'/> Facturas Recientes</h1>
                        <p className='text-md text-gray-300'>Historial de facturas recibidas</p>
                        </div>
                        <div className="w-full relative ">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar factura por nombre..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 border p-2 rounded-md dark:bg-neutral-900 dark:border-neutral-700"
                            />



                    <div className="absolute right-0 top-12 z-10 my-2">
                        <Button
                            type="button"
                            onClick={() => setShowOptions(!showOptions)}
                            
                        >
                            Ordenar por...
                        </Button>
                                    
                        {showOptions && (
                            <div className="mt-1 w-48 rounded shadow-lg bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700">
                                {[
                                    { label: 'Más reciente primero', value: 'recientes' },
                                    { label: 'Más antiguo primero', value: 'antiguos' },
                                    { label: 'Último mes', value: 'ultimoMes' },
                                    { label: 'Últimas 24 horas', value: 'ultimas24' },
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => {
                                            setOrderFilter(opt.value as any);
                                            setShowOptions(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 text-sm"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>






                         
                         </div>
                         
                    </div>

                    {facturas.length === 0 ? (
                        <div className=' flex flex-col h-48 justify-center items-center'>
                            <div className='bg-gray-500 rounded-full p-4 mb-4'>
                                <FileText size={35} />
                            </div>
                            <p className='text-xl'>No hay facturas disponibles.</p>
                            <p className='text-md'>Las facturas de tus pagos aparecerán aquí una vez procesadas.</p>
                        </div>
                        
                    ) : (
                    <ul className="space-y-2">
                       <hr className="my-10 border-t-2 border-gray-500 opacity-40 rounded" />
                       <span className="text-lg p-1">Nombre y Fecha</span>
                       {facturas
                         .filter((factura) =>
                             factura.nombre.toLowerCase().includes(search.toLowerCase())
                         )
                         .filter((factura) => {
                             const fecha = new Date(factura.created_at);
                             const ahora = new Date();

                             if (orderFilter === 'ultimas24') {
                                 return ahora.getTime() - fecha.getTime() <= 24 * 60 * 60 * 1000;
                             }
                         
                             if (orderFilter === 'ultimoMes') {
                                 const haceUnMes = new Date();
                                 haceUnMes.setMonth(haceUnMes.getMonth() - 1);
                                 return fecha >= haceUnMes;
                             }
                         
                             return true; // para 'recientes', 'antiguos', ''
                         })
                         .sort((a, b) => {
                             const fechaA = new Date(a.created_at).getTime();
                             const fechaB = new Date(b.created_at).getTime();

                             if (orderFilter === 'recientes') return fechaB - fechaA;
                             if (orderFilter === 'antiguos') return fechaA - fechaB;
                             return 0;
                         })
                         .map((factura) => (

                        <li key={factura.id} className="flex items-center bg-[#171717] mt-2 justify-between p-3 border rounded-lg">
                            <span className="truncate max-w-xs">
                                {factura.nombre}
                                <span className="block text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(factura.created_at).toLocaleString()}
                                </span>
                            </span>
                            <div className="flex items-center gap-4">
                                <a
                                    href={`/storage/${factura.ruta}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-500"
                                >
                                    Ver PDF
                                </a>
                                <button
                                    onClick={() => handleDelete(factura.id)}
                                    className="text-red-600 hover:text-red-500 hover:underline cursor-pointer"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                  </ul>

                    )}
                </div>
            </div>
        </AppLayout>
    );
}
