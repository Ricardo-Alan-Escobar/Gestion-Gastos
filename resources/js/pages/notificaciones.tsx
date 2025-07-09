
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Norificaciones',
        href: '/notificaciones',
    },
];

export default function Notificaciones() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notificaciones" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='w-full h-auto p-5 bg-white dark:bg-neutral-800 rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
                    <h1 className='text-3xl font-bold mb-2'>Gestión de pagos</h1>
                    <p>Administracion de pagos pendientes y programados.</p>
                </div>
                <div className='flex flex-row gap-4'>
               
              
                </div>
            </div>
        </AppLayout>
    );
}
