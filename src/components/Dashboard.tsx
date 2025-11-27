import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import type { Expense, Currency } from '../types';

interface DashboardProps {
    salary: number;
    expenses: Expense[];
    currency: Currency;
}

export const Dashboard: React.FC<DashboardProps> = ({ salary, expenses, currency }) => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = salary - totalExpenses;
    const expensePercentage = salary > 0 ? (totalExpenses / salary) * 100 : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-primary-500">Monthly Salary</p>
                        <p className="text-2xl font-bold text-primary-900 font-serif">{currency.symbol}{salary.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                        <TrendingDown className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-primary-500">Total Expenses</p>
                        <p className="text-2xl font-bold text-primary-900 font-serif">{currency.symbol}{totalExpenses.toLocaleString()}</p>
                        <p className="text-xs text-primary-400 mt-1">{expensePercentage.toFixed(1)}% of income</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent-50 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-primary-500">Remaining</p>
                        <p className={`text-2xl font-bold font-serif ${remaining < 0 ? 'text-red-600' : 'text-primary-900'}`}>
                            {currency.symbol}{remaining.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
