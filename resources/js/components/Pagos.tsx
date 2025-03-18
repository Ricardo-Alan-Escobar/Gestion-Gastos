import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

interface Pago {
  id: number;
  nombre: string;
  tipo: 'mensual' | 'anual';
  monto: number;
  fecha: string;
}

const Pagos: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoPago, setNuevoPago] = useState({ nombre: '', tipo: 'mensual', monto: 0, fecha: '' });

  
  useEffect(() => {
    axios.get('/dashboard').then(response => {
      setPagos(response.data.pagos);
    });
  }, []);

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoPago({ ...nuevoPago, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await Inertia.post('/pagos', nuevoPago);
    setModalOpen(false);
  };

  return (
    <div className='w-1/2 h-full p-5 bg-white dark:bg-neutral-950 border rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h1 className='text-2xl font-bold'>Pagos Pendientes</h1>
          <p className='text-md text-gray-300'>Gestión de pagos pendientes</p>
        </div>
        <Button size='lg' variant='default' className='font-extrabold cursor-pointer' onClick={() => setModalOpen(true)}>
          <Plus /> Nuevo Pago
        </Button>
      </div>

      {/* Tabla de pagos */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Nombre</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Monto</th>
            <th className="p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id} className="border-b">
              <td className="p-2">{pago.nombre}</td>
              <td className="p-2">{pago.tipo}</td>
              <td className="p-2">${pago.monto}</td>
              <td className="p-2">{pago.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar pagos */}
      {modalOpen && (
        <div className="fixed inset-0 bg-neutral-950 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900">Nuevo Pago</h2>
            <p className="text-md mb-4 text-gray-500">Completa los detalles para registrar un nuevo pago programado.</p>
            <form onSubmit={handleSubmit} className='text-gray-900'>
              <p className='mb-1 text-sm'><strong>Nombre</strong></p>
              <input className="border border-gray-300 text-sm p-2 w-full mb-5 text-gray-900 rounded-md" type="text" name="nombre" placeholder="Nombre del pago" onChange={handleChange} required />
              <p className='mb-1 text-sm'><strong>Frecuencia</strong></p>
              <select className="border border-gray-300 p-2 pr-3 w-full text-gray-900 rounded-md mb-5" name="tipo" onChange={handleChange}>
                <option value="mensual">Mensual</option>
                <option value="anual">Anual</option>
                <option value="anual">Bimestral</option>
              </select>
              <p className='mb-1 text-sm '><strong>Monto</strong></p>
              <input className="border p-2 border-gray-300 w-full mb-5 rounded-md" type="number" name="monto" placeholder="$ 0.00" onChange={handleChange} required />
              <p className='mb-1 text-sm'><strong>Fecha</strong></p>
              <input className="border p-2 w-full border-gray-300 mb-2 rounded-md " type="date" name="fecha" onChange={handleChange} required />
              <div className='flex justify-end items-center'>
              <Button type="submit" className="mr-2 my-3 bg-gray-200 hover:bg-gray-300 cursor-pointer">Guardar</Button>
              <Button variant="destructive" className='cursor-pointer' onClick={() => setModalOpen(false)}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagos;
