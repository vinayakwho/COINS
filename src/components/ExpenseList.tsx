import React, { useState } from 'react';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import type { Expense, Currency } from '../types';
import { format } from 'date-fns';
import { ExpenseForm } from './ExpenseForm';

interface ExpenseListProps {
    expenses: Expense[];
    onUpdate: (id: string, expense: Partial<Expense>) => void;
    onDelete: (id: string) => void;
    currency: Currency;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onUpdate, onDelete, currency }) => {
    const [editingId, setEditingId] = useState<string | null>(null);

    if (expenses.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-primary-100 shadow-sm">
                <p className="text-primary-500">No expenses recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {expenses.map((expense) => (
                <React.Fragment key={expense.id}>
                    {editingId === expense.id ? (
                        <ExpenseForm
                            initialData={expense}
                            onSave={(updated) => {
                                onUpdate(expense.id, updated);
                                setEditingId(null);
                            }}
                            onCancel={() => setEditingId(null)}
                        />
                    ) : (
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-primary-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-primary-900 text-lg font-serif">
                                            {currency.symbol}{expense.amount.toFixed(2)}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium border border-primary-100">
                                            {expense.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-primary-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {format(new Date(expense.date), 'MMM d, yyyy')}
                                        </div>
                                        {expense.remarks && (
                                            <span className="text-primary-400">• {expense.remarks}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingId(expense.id)}
                                        className="p-2 text-primary-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(expense.id)}
                                        className="p-2 text-primary-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};
