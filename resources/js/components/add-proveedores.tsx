
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useForm } from '@inertiajs/react';

export type Proveedor = {
  id: number;
  tipo: string;
  contacto: string;
  telefono: string;
  correo: string;
  direccion: string;
  sitio_web: string;
  notas: string;
};

type Props = {
  proveedores: Proveedor[];
};

const Add: React.FC<Props> = ({ proveedores }) => {
  const [selected, setSelected] = useState<Proveedor | null>(null);

  const { data, setData, post, reset } = useForm({
    tipo: '',
    contacto: '',
    telefono: '',
    correo: '',
    direccion: '',
    sitio_web: '',
    notas: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/proveedores', {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      {/* Lista de proveedores */}
      <div className="w-1/2 p-5 bg-white dark:bg-neutral-950 border rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Lista de Proveedores</h1>
            <p>Gestiona tus proveedores</p>
          </div>
          <Button onClick={submit} size="lg" variant="default">
            <Plus className="mr-2" /> Guardar
          </Button>
        </div>

        <input className="border rounded-md w-full p-2 mb-2" placeholder="Buscar..." />
        <ul>
          {proveedores.map((p) => (
            <li key={p.id} onClick={() => setSelected(p)} className="cursor-pointer hover:bg-gray-100 p-1">
              {p.contacto}
            </li>
          ))}
        </ul>

        <form onSubmit={submit} className="mt-4 space-y-2">
          <input type="text" placeholder="Tipo" value={data.tipo} onChange={(e) => setData('tipo', e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Contacto" value={data.contacto} onChange={(e) => setData('contacto', e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Teléfono" value={data.telefono} onChange={(e) => setData('telefono', e.target.value)} className="w-full p-2 border rounded" />
          <input type="email" placeholder="Correo" value={data.correo} onChange={(e) => setData('correo', e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Dirección" value={data.direccion} onChange={(e) => setData('direccion', e.target.value)} className="w-full p-2 border rounded" />
          <input type="url" placeholder="Sitio Web" value={data.sitio_web} onChange={(e) => setData('sitio_web', e.target.value)} className="w-full p-2 border rounded" />
          <textarea placeholder="Notas" value={data.notas} onChange={(e) => setData('notas', e.target.value)} className="w-full p-2 border rounded" />
          <Button type="submit">Guardar</Button>
        </form>
      </div>

      {/* Detalles del proveedor */}
      <div className="w-1/2 p-5 bg-white dark:bg-neutral-950 border rounded-xl">
        <h2 className="text-xl font-bold">Detalles del Proveedor</h2>
        {selected ? (
          <div className="mt-4">
            <p>
              <strong>Tipo:</strong> {selected.tipo}
            </p>
            <p>
              <strong>Contacto:</strong> {selected.contacto}
            </p>
            <p>
              <strong>Teléfono:</strong> {selected.telefono}
            </p>
            <p>
              <strong>Correo:</strong> {selected.correo}
            </p>
            <p>
              <strong>Dirección:</strong> {selected.direccion}
            </p>
            <p>
              <strong>Sitio web:</strong> {selected.sitio_web}
            </p>
            <p>
              <strong>Notas:</strong> {selected.notas}
            </p>
          </div>
        ) : (
          <p>Selecciona un proveedor</p>
        )}
      </div>
    </>
  );
};

export default Add;
