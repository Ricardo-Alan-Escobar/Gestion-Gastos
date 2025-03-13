import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import Gastos from './Gastos';

const Resumen: React.FC = () => {
   

    return (
       <div className='w-1/2 h-full p-5 bg-white  dark:bg-neutral-950 border rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
            <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-bold'>Resumen</h1> 

            <div className='flex gap-4'>
           <div className='border p-5 rounded-xl w-full'>
            <p className='mb-2'>Total Mensual</p>
            <h1 className='text-2xl font-bold'>$ 0.00 MXN</h1>
           </div>
           
           <div className='border p-5 rounded-xl w-full'>
            <p className='mb-2'>Total Anual</p>
            <h1 className='text-2xl font-bold'>$ 0.00 MXN</h1>
           </div>
            </div>

            <div className='flex gap-4'>
           <div className='border p-5 rounded-xl w-full'>
            <p className='mb-2'>Proximo Pago</p>
            <h1 className='text-2xl font-bold'>$ 0.00 MXN</h1>
           </div>
           
           <div className='border p-5 rounded-xl w-full'>
            <p className='mb-2'>Total General</p>
            <h1 className='text-2xl font-bold'>$ 0.00 MXN</h1>
           </div>
            </div>
            <Gastos></Gastos>
           
            </div>
        </div>
    );
};

export default Resumen;