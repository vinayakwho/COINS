import React, { useState } from 'react';
import { CATEGORIES } from '../types';
import type { Expense, Currency } from '../types';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line
} from 'recharts';
import { format, parseISO } from 'date-fns';

interface ChartsContainerProps {
    expenses: Expense[];
    currency: Currency;
}

const COLORS = ['#627d98', '#f0a92e', '#486581', '#d98b1c', '#334e68', '#b06611', '#243b53', '#8a4b0d', '#102a43', '#546e7a'];

export const ChartsContainer: React.FC<ChartsContainerProps> = ({ expenses, currency }) => {
    const [chartType, setChartType] = useState<'pie' | 'bar' | 'line' | 'histogram'>('pie');

    // Data for Pie and Bar charts (Category wise)
    const categoryData = CATEGORIES.map(cat => {
        const total = expenses
            .filter(e => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0);
        return { name: cat, value: total };
    }).filter(d => d.value > 0);

    // Data for Line chart (Daily trend)
    const lineData = (() => {
        if (expenses.length === 0) return [];
        // Sort expenses by date
        const sorted = [...expenses].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        // Aggregate by date
        const dateMap = new Map<string, number>();
        sorted.forEach(e => {
            const date = e.date;
            dateMap.set(date, (dateMap.get(date) || 0) + e.amount);
        });
        return Array.from(dateMap.entries()).map(([date, amount]) => ({
            date: format(parseISO(date), 'MMM d'),
            amount
        }));
    })();

    // Data for Histogram (Amount ranges)
    const histogramData = (() => {
        if (expenses.length === 0) return [];
        const maxAmount = Math.max(...expenses.map(e => e.amount));
        const binSize = maxAmount / 5 || 100; // 5 bins
        const bins = Array.from({ length: 5 }, (_, i) => ({
            range: `${(i * binSize).toFixed(0)} - ${((i + 1) * binSize).toFixed(0)}`,
            count: 0,
            min: i * binSize,
            max: (i + 1) * binSize
        }));

        expenses.forEach(e => {
            const bin = bins.find(b => e.amount >= b.min && e.amount < b.max) || bins[bins.length - 1];
            bin.count++;
        });

        return bins.map(b => ({ name: b.range, count: b.count }));
    })();

    const renderChart = () => {
        if (expenses.length === 0) {
            return (
                <div className="h-64 flex items-center justify-center text-primary-400">
                    No data to display
                </div>
            );
        }

        switch (chartType) {
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `${currency.symbol}${value.toFixed(2)}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `${currency.symbol}${value.toFixed(2)}`} />
                            <Legend />
                            <Bar dataKey="value" name="Amount" fill="#627d98" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `${currency.symbol}${value.toFixed(2)}`} />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#f0a92e" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'histogram':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={histogramData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" name="Frequency" fill="#d98b1c" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-primary-900 font-serif">Expense Analysis</h2>
                <div className="flex bg-primary-50 p-1 rounded-lg">
                    {(['pie', 'bar', 'line', 'histogram'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setChartType(type)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${chartType === type
                                ? 'bg-white text-accent-600 shadow-sm'
                                : 'text-primary-500 hover:text-primary-700'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
            {renderChart()}
        </div>
    );
};
