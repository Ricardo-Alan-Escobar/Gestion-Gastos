import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gastos from './Gastos';

const Resumen: React.FC = () => {
    const [totales, setTotales] = useState({
        totalMensual: 0,
        totalAnual: 0,
        proximoPago: 0,
        totalGeneral: 0
    });

    useEffect(() => {
        const fetchPagos = async () => {
            try {
                const response = await axios.get('/pagos'); // Ruta en Laravel
                const pagos = response.data.pagos;

                const totalMensual = pagos
                    .filter((pago: any) => pago.tipo === 'mensual')
                    .reduce((acc: number, pago: any) => acc + pago.monto, 0);

                const totalAnual = pagos
                    .filter((pago: any) => pago.tipo === 'anual')
                    .reduce((acc: number, pago: any) => acc + pago.monto, 0);

                const totalGeneral = pagos.reduce((acc: number, pago: any) => acc + pago.monto, 0);

                // Buscar el próximo pago más cercano
                const pagosOrdenados = [...pagos].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
                const proximoPago = pagosOrdenados.length > 0 ? pagosOrdenados[0].monto : 0;

                setTotales({ totalMensual, totalAnual, proximoPago, totalGeneral });
            } catch (error) {
                console.error('Error al obtener los pagos', error);
            }
        };

        fetchPagos();
    }, []);

    return (
        <div className='w-1/2 h-full p-5 bg-white dark:bg-neutral-950 border rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>Resumen</h1>

                <div className='flex gap-4'>
                    <div className='border p-5 rounded-xl w-full'>
                        <p className='mb-2'>Total Mensual</p>
                        <h1 className='text-2xl font-bold'>{totales.totalMensual.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</h1>
                    </div>

                    <div className='border p-5 rounded-xl w-full'>
                        <p className='mb-2'>Total Anual</p>
                        <h1 className='text-2xl font-bold'>{totales.totalAnual.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</h1>
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className='border p-5 rounded-xl w-full'>
                        <p className='mb-2'>Próximo Pago</p>
                        <h1 className='text-2xl font-bold'>{totales.proximoPago.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</h1>
                    </div>

                    <div className='border p-5 rounded-xl w-full'>
                        <p className='mb-2'>Total General</p>
                        <h1 className='text-2xl font-bold'>{totales.totalGeneral.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</h1>
                    </div>
                </div>

                <Gastos />
            </div>
        </div>
    );
};

export default Resumen;
