import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Gastos: React.FC = () => {
    const [data, setData] = useState([
        { mes: 'Enero', gasto: 1200 },
        { mes: 'Febrero', gasto: 900 },
        { mes: 'Marzo', gasto: 1500 },
        { mes: 'Abril', gasto: 1100 },
        { mes: 'Mayo', gasto: 1700 },
        { mes: 'Junio', gasto: 1300 },
        { mes: 'Julio', gasto: 1400 },
        { mes: 'Agosto', gasto: 1250 },
        { mes: 'Septiembre', gasto: 1600 },
        { mes: 'Octubre', gasto: 1450 },
        { mes: 'Noviembre', gasto: 1550 },
        { mes: 'Diciembre', gasto: 1800 }
    ]);

    return (
        <div className='h-full p-5 bg-white dark:bg-neutral-950 border rounded-xl border-sidebar-border/70 dark:border-sidebar-border'>
            <div className='flex flex-col'>
                <h1 className='text-2xl font-bold'>Gastos Mensuales</h1>
                <p>Distribución de pagos durante el año.</p>
            </div>
            
            <div className="relative z-0 mt-5">
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="gasto" fill="#a22525" barSize={40} />
        </BarChart>
    </ResponsiveContainer>
</div>

        </div>
    );
};

export default Gastos;
