"use client";
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DailyTimeline({ data }) {
    if (!data) return null;

    return (
        <div style={{ width: '100%', background: 'white', padding: 12, borderRadius: 'var(--radius-md)' }}>
            <div className="text-sm text-gray-500">Timeline quotidienne des rendez-vous (par heure)</div>
            <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="var(--color-primary)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
