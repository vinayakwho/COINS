import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import type { Currency } from '../types';

interface YearlyAnalyticsProps {
    data: {
        monthlyStats: { month: string; income: number; expenses: number; savings: number }[];
        totalIncome: number;
        totalExpenses: number;
        totalSavings: number;
        categoryTotals: Record<string, number>;
    };
    currency: Currency;
    year: number;
}

const COLORS = ['#627d98', '#f0a92e', '#486581', '#d98b1c', '#334e68', '#b06611', '#243b53', '#8a4b0d', '#102a43', '#546e7a'];

export const YearlyAnalytics: React.FC<YearlyAnalyticsProps> = ({ data, currency, year }) => {
    const categoryData = Object.entries(data.categoryTotals).map(([name, value]) => ({ name, value }));

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
                    <p className="text-sm font-medium text-primary-500">Total Yearly Income</p>
                    <p className="text-2xl font-bold text-primary-900 font-serif">{currency.symbol}{data.totalIncome.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
                    <p className="text-sm font-medium text-primary-500">Total Yearly Expenses</p>
                    <p className="text-2xl font-bold text-red-600 font-serif">{currency.symbol}{data.totalExpenses.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
                    <p className="text-sm font-medium text-primary-500">Total Yearly Savings</p>
                    <p className={`text-2xl font-bold font-serif ${data.totalSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {currency.symbol}{data.totalSavings.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
                    <h3 className="text-lg font-semibold text-primary-900 font-serif mb-4">Income vs Expenses vs Savings ({year})</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.monthlyStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `${currency.symbol}${value.toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="income" name="Income" fill="#627d98" />
                            <Bar dataKey="expenses" name="Expenses" fill="#f0a92e" />
                            <Bar dataKey="savings" name="Savings" fill="#102a43" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
                    <h3 className="text-lg font-semibold text-primary-900 font-serif mb-4">Category Breakdown ({year})</h3>
                    {categoryData.length > 0 ? (
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
                                <Tooltip formatter={(value: number) => `${currency.symbol}${value.toLocaleString()}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-primary-400">
                            No expenses recorded for this year
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-primary-900 font-serif mb-4">Savings Trend ({year})</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data.monthlyStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `${currency.symbol}${value.toLocaleString()}`} />
                            <Legend />
                            <Line type="monotone" dataKey="savings" name="Savings" stroke="#102a43" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
