import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Reportes', href: '/reportes' },
];


type ReportesProps = {
  resumen: { titulo: string; valor: string | number }[];
  datosMensuales: { mes: string; total: number }[];
  datosCategorias: { name: string; value: number }[];
  ultimos: { id: number; titulo: string; fecha: string; estado: string }[];
};

const colores = ['#8884d8', '#82ca9d', '#ffc658', '#ff6b6b'];

export default function Reportes({ resumen, datosMensuales, datosCategorias, ultimos }: ReportesProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reportes" />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reportes</h1>
          <p className="text-gray-500">Resumen general de actividades y estadísticas</p>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {resumen.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow border">
              <p className="text-sm text-gray-500">{item.titulo}</p>
              <p className="text-xl font-bold">{item.valor}</p>
            </div>
          ))}
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow border">
            <h2 className="text-lg font-bold mb-3">Reporte mensual</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={datosMensuales}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow border">
            <h2 className="text-lg font-bold mb-3">Por categoría</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={datosCategorias}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {datosCategorias.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow border">
          <h2 className="text-lg font-bold mb-3">Últimos reportes</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2">#</th>
                <th className="p-2">Título</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ultimos.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.titulo}</td>
                  <td className="p-2">{item.fecha}</td>
                  <td className={`p-2 ${item.estado === 'Revisado' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {item.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
