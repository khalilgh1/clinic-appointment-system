"use client";
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function WeeklyTrend({ data }) {
    if (!data) return null;

    return (
        <div style={{ width: '100%', background: 'white', padding: 12, borderRadius: 'var(--radius-md)' }}>
            <div className="text-sm text-gray-500">Tendance hebdomadaire des rendez-vous</div>
            <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
