import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
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

export interface PageProps {
  proveedores: Proveedor[];
  [key: string]: any;  // Índice dinámico añadido para cumplir con lo que Inertia espera
}