
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Pagos from '@/components/Pagos';
import Resumen from '@/components/Resumen';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='w-full h-auto p-5 bg-white dark:bg-neutral-800 rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
                    <h1 className='text-3xl font-bold mb-2'>Gestión de pagos</h1>
                    <p>Administracion de pagos pendientes y programados.</p>
                </div>
                <div className='flex flex-row gap-4'>
                <Pagos/>
                <Resumen/>
                </div>
            </div>
        </AppLayout>
    );
}
