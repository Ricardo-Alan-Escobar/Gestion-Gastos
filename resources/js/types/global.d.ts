import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}
// resources/js/types/index.ts

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
}
