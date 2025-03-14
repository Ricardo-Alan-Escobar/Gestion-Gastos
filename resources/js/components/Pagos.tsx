import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';


const Pagos: React.FC = () => {
   

    return (
       <div className='w-1/2 h-full p-5 bg-white  dark:bg-neutral-950 border rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
            <div className='flex justify-between items-center'>
            <div>
            <h1 className='text-2xl font-bold'>Pagos Pendientes</h1>
            <p className='text-md text-gray-300'>Gestión de pagos pendientes</p>
            </div>
            <div>
                <Button size='lg' variant='default' className=' font-extrabold cursor-pointer'> <Plus/> Nuevo Pago</Button>
            </div>
            </div>
        </div>
    );
};

export default Pagos;