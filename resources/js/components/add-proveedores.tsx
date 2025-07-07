import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X, Building2, User, Phone, Mail, MapPin, Globe, StickyNote, } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';


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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editandoProveedor, setEditandoProveedor] = useState<Proveedor | null>(null);

  const { data, setData, post, put, processing, reset, errors } = useForm({
    tipo: '',
    contacto: '',
    telefono: '',
    correo: '',
    direccion: '',
    sitio_web: '',
    notas: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && editandoProveedor) {
      // Actualizar proveedor existente
      put(route('proveedores.update', editandoProveedor.id), {
        onSuccess: () => {
          reset();
          setIsModalOpen(false);
          setIsEditMode(false);
          setEditandoProveedor(null);

          Swal.fire({
            title: '¡Proveedor actualizado!',
            text: 'El proveedor ha sido actualizado exitosamente.',
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
        },
        onError: () => {
          // Opcional: mostrar toast de error
        },
      });
    } else {
      // Crear nuevo proveedor
      post(route('proveedores.store'), {
        onSuccess: () => {
          reset();
          setIsModalOpen(false);

          Swal.fire({
            title: '¡Proveedor agregado!',
            text: 'El proveedor ha sido registrado exitosamente.',
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
        },
        onError: () => {
          // Opcional: mostrar toast de error
        },
      });
    }
  };

  const handleEdit = (proveedor: Proveedor) => {
    setEditandoProveedor(proveedor);
    setData({
      tipo: proveedor.tipo,
      contacto: proveedor.contacto,
      telefono: proveedor.telefono,
      correo: proveedor.correo,
      direccion: proveedor.direccion,
      sitio_web: proveedor.sitio_web,
      notas: proveedor.notas,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (proveedor: Proveedor) => {
    Swal.fire({
      title: '¿Eliminar proveedor?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      background: '#171717',
      color: '#fff',
      iconColor: '#f87171',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      customClass: {
        popup: 'text-sm rounded-md shadow-lg border-2 border-red-500',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('proveedores.destroy', proveedor.id), {
          onSuccess: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El proveedor ha sido eliminado.',
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
          }
        });
      }
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    setEditandoProveedor(null);
    reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditandoProveedor(null);
    reset();
  };

  // Filtrar proveedores basado en la búsqueda
  const filteredProveedores = proveedores.filter(p =>
    p.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex gap-6 h-full w-full">
        {/* Lista de proveedores */}
        <div className="w-1/2 p-5 bg-white dark:bg-neutral-950 border rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Lista de Proveedores</h1>
              <p className="text-gray-600 dark:text-gray-400">Gestiona tus proveedores</p>
            </div>
            <Button onClick={openModal} size="lg" variant="default">
              <Plus className="mr-2 h-4 w-4" /> Nuevo
            </Button>
          </div>

          <input 
            className="border rounded-md w-full p-2 mb-4" 
            placeholder="Buscar proveedores..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="max-h-96 overflow-y-auto pr-3">
            <ul className="space-y-2">
              {filteredProveedores.map((p) => (
                <li
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-3 rounded-lg border transition-colors flex justify-between items-center ${
                    selected?.id === p.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'border-gray-200 dark:border-neutral-700'
                  }`}
                >
                  {/* Contenido info */}
                  <div>
                    <div className="font-medium">{p.contacto}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{p.tipo}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">{p.correo}</div>
                  </div>

                  {/* Botones alineados a la derecha */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Evitar que dispare el onClick del <li>
                        handleEdit(p);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(p);
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            {filteredProveedores.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No se encontraron proveedores
              </div>
            )}
          </div>
        </div>

        {/* Detalles del proveedor */}
        <div className="w-full md:w-1/2 p-6 bg-white dark:bg-neutral-950 border rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center border-b pb-2">
            Detalles del Proveedor
          </h2>

          {selected ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tipo */}
              <div className="flex items-start gap-3 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-sm">
                <Building2 className="w-5 h-5 mt-1 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Tipo</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-100">{selected.tipo}</p>
                </div>
              </div>

              {/* Contacto */}
              <div className="flex items-start gap-3 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-sm">
                <User className="w-5 h-5 mt-1 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Contacto</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-100">{selected.contacto}</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-3 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-sm">
                <Phone className="w-5 h-5 mt-1 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-100">{selected.telefono}</p>
                </div>
              </div>

              {/* Correo */}
              <div className="flex items-start gap-3 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-sm">
                <Mail className="w-5 h-5 mt-1 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Correo</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-100">{selected.correo}</p>
                </div>
              </div>

              {/* Dirección */}
              <div className="flex items-start gap-3 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-sm sm:col-span-2">
                <MapPin className="w-5 h-5 mt-1 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Dirección</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-100">{selected.direccion}</p>
                </div>
              </div>

              {/* Sitio Web */}
              <div className="flex items-start gap-3 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-sm sm:col-span-2">
                <Globe className="w-5 h-5 mt-1 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Sitio web</p>
                  {selected.sitio_web ? (
                    <a
                      href={selected.sitio_web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm underline"
                    >
                      {selected.sitio_web}
                    </a>
                  ) : (
                    <p className="text-base text-gray-800 dark:text-gray-100">No especificado</p>
                  )}
                </div>
              </div>

              {/* Notas */}
              <div className="flex items-start gap-3 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-sm sm:col-span-2">
                <StickyNote className="w-5 h-5 mt-1 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Notas</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                    {selected.notas || 'Sin notas'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-lg mb-2">Selecciona un proveedor</div>
              <p className="text-sm">Haz clic en un proveedor de la lista para ver sus detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar/editar proveedor */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                {isEditMode ? 'Editar Proveedor' : 'Nuevo Proveedor'}
              </h3>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tipo *
                </label>
                <input 
                  type="text" 
                  placeholder="Ej: Proveedor de servicios" 
                  value={data.tipo} 
                  onChange={(e) => setData('tipo', e.target.value)} 
                  className={`w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.tipo ? 'border-red-500' : ''}`}
                  required
                />
                {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contacto *
                </label>
                <input 
                  type="text" 
                  placeholder="Nombre del contacto" 
                  value={data.contacto} 
                  onChange={(e) => setData('contacto', e.target.value)} 
                  className={`w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.contacto ? 'border-red-500' : ''}`}
                  required
                />
                {errors.contacto && <p className="text-red-500 text-sm mt-1">{errors.contacto}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Teléfono
                </label>
                <input 
                  type="tel" 
                  placeholder="Número de teléfono" 
                  value={data.telefono} 
                  onChange={(e) => setData('telefono', e.target.value)} 
                  className={`w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.telefono ? 'border-red-500' : ''}`}
                />
                {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Correo electrónico
                </label>
                <input 
                  type="email" 
                  placeholder="correo@ejemplo.com" 
                  value={data.correo} 
                  onChange={(e) => setData('correo', e.target.value)} 
                  className={`w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.correo ? 'border-red-500' : ''}`}
                />
                {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dirección
                </label>
                <input 
                  type="text" 
                  placeholder="Dirección completa" 
                  value={data.direccion} 
                  onChange={(e) => setData('direccion', e.target.value)} 
                  className={`w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.direccion ? 'border-red-500' : ''}`}
                />
                {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sitio web
                </label>
                <input 
                  type="url" 
                  placeholder="https://ejemplo.com" 
                  value={data.sitio_web} 
                  onChange={(e) => setData('sitio_web', e.target.value)} 
                  className={`w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.sitio_web ? 'border-red-500' : ''}`}
                />
                {errors.sitio_web && <p className="text-red-500 text-sm mt-1">{errors.sitio_web}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notas
                </label>
                <textarea 
                  placeholder="Información adicional..." 
                  value={data.notas} 
                  onChange={(e) => setData('notas', e.target.value)} 
                  className={`w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none ${errors.notas ? 'border-red-500' : ''}`}
                />
                {errors.notas && <p className="text-red-500 text-sm mt-1">{errors.notas}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={closeModal} 
                  variant="outline" 
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1"
                  disabled={processing}
                >
                  {processing ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Guardar')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Add;