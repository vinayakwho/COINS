import React, { useState } from 'react';
import { DollarSign, Save } from 'lucide-react';
import type { Currency } from '../types';

interface SalaryInputProps {
    currentSalary: number;
    onSave: (amount: number) => void;
    currency: Currency;
}

export const SalaryInput: React.FC<SalaryInputProps> = ({ currentSalary, onSave, currency }) => {
    const [amount, setAmount] = useState(currentSalary.toString());
    const [isEditing, setIsEditing] = useState(currentSalary === 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(amount);
        if (!isNaN(val) && val >= 0) {
            onSave(val);
            setIsEditing(false);
        }
    };

    if (!isEditing) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-primary-100 flex items-center justify-between">
                <div>
                    <p className="text-sm text-primary-500 font-medium">Monthly Salary</p>
                    <p className="text-2xl font-bold text-primary-900 font-serif">{currency.symbol}{currentSalary.toLocaleString()}</p>
                </div>
                <button
                    onClick={() => setIsEditing(true)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                    Edit
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Set Monthly Salary
            </label>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="0.00"
                        autoFocus
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                </button>
            </div>
        </form>
    );
};
