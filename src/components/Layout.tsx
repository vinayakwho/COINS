import React from 'react';
import { PieChart, List, PlusCircle } from 'lucide-react';
import { CURRENCIES } from '../types';
import type { Currency } from '../types';
import { MonthYearSelector } from './MonthYearSelector';

interface LayoutProps {
    children: React.ReactNode;
    activeTab: 'dashboard' | 'expenses' | 'add' | 'yearly';
    onTabChange: (tab: 'dashboard' | 'expenses' | 'add' | 'yearly') => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    selectedMonth: number;
    selectedYear: number;
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    activeTab,
    onTabChange,
    currency,
    onCurrencyChange,
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
}) => {
    return (
        <div className="min-h-screen bg-cream flex flex-col font-sans text-primary-900">
            <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-primary-100">
                <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/coins-logo.png" alt="COINS Logo" className="h-10 w-auto object-contain" />

                        </div>

                        <div className="relative">
                            <select
                                value={currency.code}
                                onChange={(e) => {
                                    const selected = CURRENCIES.find(c => c.code === e.target.value);
                                    if (selected) onCurrencyChange(selected);
                                }}
                                className="appearance-none bg-primary-50 border border-primary-200 text-primary-900 py-1.5 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 cursor-pointer"
                            >
                                {CURRENCIES.map(c => (
                                    <option key={c.code} value={c.code}>
                                        {c.symbol} {c.code}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <MonthYearSelector
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            onMonthChange={onMonthChange}
                            onYearChange={onYearChange}
                        />
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
                {children}
            </main>

            <nav className="bg-white border-t border-primary-100 sticky bottom-0 z-10 pb-safe">
                <div className="max-w-md mx-auto flex justify-around p-2">
                    <button
                        onClick={() => onTabChange('dashboard')}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'text-accent-600 bg-accent-50' : 'text-primary-400 hover:text-primary-600'
                            }`}
                    >
                        <PieChart className="w-6 h-6" />
                        <span className="text-xs font-medium mt-1">Overview</span>
                    </button>
                    <button
                        onClick={() => onTabChange('add')}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'add' ? 'text-accent-600 bg-accent-50' : 'text-primary-400 hover:text-primary-600'
                            }`}
                    >
                        <PlusCircle className="w-6 h-6" />
                        <span className="text-xs font-medium mt-1">Add</span>
                    </button>
                    <button
                        onClick={() => onTabChange('expenses')}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'expenses' ? 'text-accent-600 bg-accent-50' : 'text-primary-400 hover:text-primary-600'
                            }`}
                    >
                        <List className="w-6 h-6" />
                        <span className="text-xs font-medium mt-1">History</span>
                    </button>
                    <button
                        onClick={() => onTabChange('yearly')}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'yearly' ? 'text-accent-600 bg-accent-50' : 'text-primary-400 hover:text-primary-600'
                            }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-xs font-medium mt-1">Yearly</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};
