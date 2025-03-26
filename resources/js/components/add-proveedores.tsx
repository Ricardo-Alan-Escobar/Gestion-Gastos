import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const Resumen: React.FC = () => {
    

   
    return (
        <>
        {/* Cards de proveedores */}
        <div className='w-1/2 h-full p-5 bg-white dark:bg-neutral-950 border rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
           <div className='flex justify-between items-center mb-4'>
        <div>
          <h1 className='text-2xl font-bold'>Lista de Proveedores</h1>
          <p className='text-md '>Gestiona tus proveedores de servicios</p>
        </div>
        <Button size='lg' variant='default' className='font-extrabold cursor-pointer' >
          <Plus /> Nuevo Proveedor
        </Button>
      </div>
      <input type=" " className='border  rounded-md w-full p-2' placeholder='Buscar proveedores...'/>
        </div>
        


        {/* Mostrar los datos del proveedor seleccionado */}
        <div className='w-1/2 h-full p-5 bg-white dark:bg-neutral-950 border rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
           <div className='flex justify-between items-center mb-4'>
        <div>
          <h1 className='text-2xl font-bold'>Detalles del Proveedor</h1>
          <p className='text-md '>Información y servicios contratados</p>
        </div>
        
      </div>
        </div>
        </>
    );
};

export default Resumen;
