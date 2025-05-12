
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Add from '@/components/add-proveedores';
import { usePage } from '@inertiajs/react';
import type { PageProps, Proveedor } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Proveedores',
        href: '/proveedores',
    },
];
 
export default function Proveedores() {
const { proveedores } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proveedores" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='w-full h-auto p-5 bg-white dark:bg-neutral-800 rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
                    <h1 className='text-3xl font-bold mb-2'>Proveedores</h1>
                    <p>Gestiona tus proveedores de servicios y sus datos de contacto.</p>
                </div>
                <div className='flex flex-row gap-4'>
               <Add proveedores={proveedores ?? []} />

            
              
              
                </div>
            </div>
        </AppLayout>
    );
}
