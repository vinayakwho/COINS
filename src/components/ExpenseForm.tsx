import React, { useState } from 'react';
import { Calendar, Tag, DollarSign, FileText, Plus, Save } from 'lucide-react';
import { CATEGORIES } from '../types';
import type { Category, Expense } from '../types';

interface ExpenseFormProps {
    onSave: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
    initialData?: Expense;
    onCancel?: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSave, initialData, onCancel }) => {
    const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState<Category>(initialData?.category as Category || CATEGORIES[0]);
    const [amount, setAmount] = useState(initialData?.amount.toString() || '');
    const [remarks, setRemarks] = useState(initialData?.remarks || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(amount);
        if (!isNaN(val) && val > 0) {
            onSave({
                date,
                category,
                amount: val,
                remarks
            });
            // Reset if not editing
            if (!initialData) {
                setAmount('');
                setRemarks('');
                setCategory(CATEGORIES[0]);
                setDate(new Date().toISOString().split('T')[0]);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {initialData ? 'Edit Expense' : 'Add New Expense'}
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Tag className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="number"
                            required
                            min="0.01"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Optional remarks"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {initialData ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    {initialData ? 'Save Changes' : 'Add Expense'}
                </button>
            </div>
        </form>
    );
};
