import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileText  } from 'lucide-react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Facturas',
        href: '/facturas',
    },
];

export default function Facturas() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Facturas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='w-full h-auto p-5 bg-white dark:bg-neutral-800 rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
                    <h1 className='text-3xl font-bold mb-2'>Facturas</h1>
                    <p>Visualiza y gestiona todas tus facturas.</p>
                </div>


                <div className='flex flex-col gap-4 border w-full p-5 rounded-xl'>
                      <div>
                         <h1 className='text-2xl font-bold'>Facturas Recientes</h1>
                         <p className='text-md text-gray-300'>Historial de facturas recibidas</p>
                         </div>
                         <div className=' flex flex-col h-48 justify-center items-center'>
                            <div className='bg-gray-500 rounded-full p-4 mb-4'>   <FileText size={35} /></div>
                       
                            <p className='text-xl'>No hay faturas disponibles.</p>
                            <p className='text-md'>Las facturas de tus pagos aparecerán aquí una vez procesadas.</p>
                         </div>
                </div>



            </div>
        </AppLayout>
    );
}
