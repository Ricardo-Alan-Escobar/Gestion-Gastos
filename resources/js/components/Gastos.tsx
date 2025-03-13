import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';


const Gastos: React.FC = () => {
   

    return (
       <div className=' h-full p-5 bg-white  dark:bg-neutral-950 border rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
            <div className='flex flex-col'>
            <h1 className='text-2xl font-bold'>Gastos Mensuales</h1> 
            <p>Distribución de pagos durante el año.</p>
           
           
            </div>
        </div>
    );
};

export default Gastos;