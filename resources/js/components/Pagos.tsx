import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Plus, Droplets, Lightbulb, Globe, Phone, FolderCode, Database, CircleHelp, Trash, Pencil, MoreVertical, CircleCheckBig   } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Pago {
  id: number;
  nombre: string;
  tipo: 'mensual' | 'anual' | 'bimestral';
  monto: number;
  fecha: string;
  icono?: string;
}

const iconosDisponibles = [
  { nombre: 'Droplets', icono: Droplets },
  { nombre: 'Lightbulb', icono: Lightbulb },
  { nombre: 'Globe', icono: Globe },
  { nombre: 'Phone', icono: Phone },
  { nombre: 'FolderCode', icono: FolderCode },
  { nombre: 'Database', icono: Database },
];


const Pagos: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoPago, setNuevoPago] = useState({ nombre: '', tipo: 'mensual', monto: 0, fecha: '', icono:'' });
  const [editandoPago, setEditandoPago] = useState<Pago | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  
  useEffect(() => {
    axios.get('/dashboard').then(response => {
      setPagos(response.data.pagos);
    });
  }, []);

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoPago({ ...nuevoPago, [e.target.name]: e.target.value });
  };

  const handleMarcarPagado = async (id: number) => {
    try {
      const response = await axios.put(`/pagos/${id}/marcar-pagado`);
      setPagos(pagos.map(pago => (pago.id === id ? response.data.pago : pago)));
  

             Swal.fire({
          title: '¡Pagado!',
          text: 'El pago ha sido marcado como pagado. Su fecha se ha actualizado.',
          icon: 'success',
          background: '#171717',
          color: '#fff',
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false,
          customClass: {
            popup: 'text-sm rounded-md shadow-lg border-2 border-green-500',
          }
        });

  
    } catch (error) {
      console.error("Error al marcar como pagado:", error);
      
     
             Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al marcar el pago como pagado.',
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
  };
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  await Inertia.post('/pagos', nuevoPago);

 
  Swal.fire({
    title: '¡Pagado!',
    text: 'El pago ha sido marcado como pagado. Su fecha se ha actualizado.',
    icon: 'success',
    background: '#171717',
    color: '#fff',
    toast: true,
    position: 'top-end',
    timer: 2500,
    showConfirmButton: false,
    customClass: {
      popup: 'text-sm rounded-md shadow-lg border-2 border-green-500',
    },
  });

  setModalOpen(false);

 
  setTimeout(() => {
    window.location.reload();
  }, 2500);
};



  const handleEditClick = (pago: Pago) => {
    setEditandoPago(pago);
    setModalOpen(true);
  };
  
  const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: '¿Eliminar pago?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    background: '#171717',
    color: '#fff',
    iconColor: '#f87171',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    toast: true,
    position: 'top-end',
    showClass: {
      popup: 'swal2-noanimation',
      backdrop: 'swal2-noanimation',
    },
    customClass: {
      popup: 'text-sm rounded-md shadow-lg border-2 border-red-500',
      confirmButton: 'text-sm px-4 py-2',
      cancelButton: 'text-sm px-4 py-2',
    },
  });

  if (result.isConfirmed) {
    await axios.delete(`/pagos/${id}`);
    setPagos(prev => prev.filter(pago => pago.id !== id));

    Swal.fire({
      title: '¡Eliminado!',
      text: 'El pago ha sido eliminado correctamente.',
      icon: 'success',
      background: '#171717',
      color: '#fff',
      toast: true,
      position: 'top-end',
      timer: 2500,
      showConfirmButton: false,
      customClass: {
        popup: 'text-sm rounded-md shadow-lg border-2 border-green-500',
      },
    });
    // Esperar antes de recargar la página
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }
};

  
const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  if (editandoPago) {
    await axios.put(`/pagos/${editandoPago.id}`, editandoPago);
    setPagos(pagos.map(p => (p.id === editandoPago.id ? editandoPago : p)));
    setEditandoPago(null);

  
    Swal.fire({
      title: '¡Actualizado!',
      text: 'El pago ha sido actualizado correctamente.',
      icon: 'success',
      background: '#171717',
      color: '#fff',
      toast: true,
      position: 'top-end',
      timer: 2500,
      showConfirmButton: false,
      customClass: {
        popup: 'text-sm rounded-md shadow-lg border-2 border-green-500',
      },
    });

   
    setTimeout(() => {
      setModalOpen(false);
      window.location.reload();
    }, 2500); 
  }
};



  
  return (
   <div className='w-1/2 p-5 bg-white dark:bg-neutral-950 border rounded-xl border-sidebar-border/70 dark:border-sidebar-border h-[36%] flex flex-col'>
      <div className='flex justify-between items-center mb-4 flex-shrink-0'>
        <div>
          <h1 className='text-2xl font-bold'>Pagos Pendientes</h1>
          <p className='text-md '>Gestión de pagos pendientes</p>
        </div>
        <Button size='lg' variant='default' className='font-extrabold cursor-pointer' onClick={() => setModalOpen(true)}>
          <Plus /> Nuevo Pago
        </Button>
      </div>

      
     <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
          {pagos.map((pago) => {
      const IconoSeleccionado = iconosDisponibles.find((icon) => icon.nombre === pago.icono)?.icono || CircleHelp;
      return (
        <div key={pago.id} className="border flex justify-between items-center rounded-lg shadow-md dark:shadow-neutral-900 p-3">
          <div className='flex items-center space-x-3'>
        <div className='bg-neutral-700 p-3 rounded-full'>   
          <IconoSeleccionado className="w-7 h-7 text-gray-300" />
        </div>
        <div>
          <h2 className="font-bold text-lg">{pago.nombre}</h2>
          <p className='text-sm text-gray-400'><span className="font-semibold">Vence: </span>{pago.fecha}</p>
        </div>
      </div>

      <div className='flex items-center space-x-3'>
        <p className='mx-3 text-xs bg-white dark:bg-neutral-800 text-black dark:text-white rounded-full p-1 px-2'>
          <strong>{pago.tipo}</strong>
        </p>
        <p>{pago.monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</p>
        
        <div className='relative'>
                  <Button onClick={() => setDropdownOpen(dropdownOpen === pago.id ? null : pago.id)} className=" rounded cursor-pointer">
                    <MoreVertical />
                  </Button>
                  {dropdownOpen === pago.id && (
                    <div className="absolute right-0 mt-2 w-50 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-md z-50">
                      <p className='p-2'>Acciones</p>
                      <hr className='bg-gray-500 h-0.5' />
                        <button
                             className="flex items-center w-full px-4 py-2 text-sm  hover:bg-gray-200 dark:hover:bg-neutral-700 "
                             onClick={() => handleMarcarPagado(pago.id)}
                           >
                            <CircleCheckBig  className="w-4 h-4 mr-2" />  Marcar como pagado
                           </button>
                        <button className="flex items-center w-full px-4  py-2 text-sm hover:bg-gray-200 dark:hover:bg-neutral-700" onClick={() => handleEditClick(pago)}>
                        <Pencil className="w-4 h-4 mr-2" /> Editar
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 text-red-600" onClick={() => handleDelete(pago.id)}>
                        <Trash className="w-4 h-4 mr-2" /> Eliminar
                      </button>

                    </div>
                  )}
                </div>
            </div>
          </div>
        );
      })}
            </div>


     
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900">Nuevo Pago</h2>
            <p className="text-md mb-4 text-gray-500">Completa los detalles para registrar un nuevo pago programado.</p>

            <form onSubmit={editandoPago ? handleUpdate : handleSubmit} className='text-gray-900'>
              <p className='mb-1 text-sm'><strong>Nombre</strong></p>
              <input
                className="border border-gray-300 text-sm p-2 w-full mb-5 text-gray-900 rounded-md"
                type="text"
                name="nombre"
                placeholder="Nombre del pago"
                value={editandoPago ? editandoPago.nombre : nuevoPago.nombre}
                onChange={(e) => {
                  if (editandoPago) setEditandoPago({ ...editandoPago, [e.target.name]: e.target.value });
                  else handleChange(e);
                }}
                required
              />

              <p className='mb-1 text-sm'><strong>Frecuencia</strong></p>
              <select
                className="border border-gray-300 p-2 w-full text-gray-900 rounded-md mb-5"
                name="tipo"
                value={editandoPago ? editandoPago.tipo : nuevoPago.tipo}
                onChange={(e) => {
                  if (editandoPago) setEditandoPago({ ...editandoPago, [e.target.name]: e.target.value });
                  else handleChange(e);
                }}
              >
                <option value="mensual">Mensual</option>
                <option value="anual">Anual</option>
                <option value="bimestral">Bimestral</option>
              </select>
              
              <p className='mb-1 text-sm'><strong>Monto</strong></p>
              <input
                className="border p-2 border-gray-300 w-full mb-5 rounded-md"
                type="number"
                name="monto"
                placeholder="$ 0.00"
                value={editandoPago ? editandoPago.monto : nuevoPago.monto}
                onChange={(e) => {
                  if (editandoPago) setEditandoPago({ ...editandoPago, [e.target.name]: e.target.value });
                  else handleChange(e);
                }}
                required
              />

              <p className='mb-1 text-sm'><strong>Fecha</strong></p>
              <input
                className="border p-2 w-full border-gray-300 mb-2 rounded-md"
                type="date"
                name="fecha"
                value={editandoPago ? editandoPago.fecha : nuevoPago.fecha}
                onChange={(e) => {
                  if (editandoPago) setEditandoPago({ ...editandoPago, [e.target.name]: e.target.value });
                  else handleChange(e);
                }}
                required
              />

              <label className='mb-1 text-sm font-bold'>Icono</label>
              <select
                className="border p-2 w-full border-gray-300 mb-5 rounded-md"
                name="icono"
                value={editandoPago ? editandoPago.icono : nuevoPago.icono}
                onChange={(e) => {
                  if (editandoPago) setEditandoPago({ ...editandoPago, [e.target.name]: e.target.value });
                  else handleChange(e);
                }}
              >
                {iconosDisponibles.map((icon) => (
                  <option key={icon.nombre} value={icon.nombre}>{icon.nombre}</option>
                ))}
              </select>
              
              <div className='flex justify-end items-center'>
                <Button type="submit" className="mr-2 my-3 bg-gray-200 hover:bg-gray-300 cursor-pointer">
                  {editandoPago ? "Actualizar" : "Guardar"}
                </Button>
                <Button variant="destructive" className='cursor-pointer' onClick={() => { setModalOpen(false); setEditandoPago(null); }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagos;
