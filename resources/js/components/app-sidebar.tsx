import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, FileText, ChartColumn, Users, Bell   } from 'lucide-react';
import AppLogo from './app-logo';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
   {
        title: 'Facturas',
        icon: FileText,
        children: [
            {
                title: 'Subir factura',
                url: '/facturas',
                
            },
          
        ],
    },
    {
        title: 'Reportes',
        url: '/reportes',
        icon: ChartColumn ,
    },
    {
        title: 'Proveedores',
        url: '/proveedores',
        icon: Users ,
    },
     {
        title: 'Notificaciones',
        url: '/notificaciones',
        icon: Bell ,
    },

];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
               
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
