import { useState, useEffect } from 'react';
import type { Expense, Currency } from '../types';
import { CURRENCIES } from '../types';

const OLD_EXPENSES_KEY = 'dime_expenses'; // Legacy key
const OLD_SALARY_KEY = 'dime_salary'; // Legacy key
const CURRENCY_KEY = 'dime_currency';

interface MonthlyData {
    expenses: Expense[];
    salary: number;
}

export const useExpenses = () => {
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    const getStorageKey = (year: number, month: number) => `coins_${year}_${month}`;

    // Currency State (Global)
    const [currency, setCurrency] = useState<Currency>(() => {
        const stored = localStorage.getItem(CURRENCY_KEY);
        return stored ? JSON.parse(stored) : CURRENCIES[0];
    });

    // Monthly Data State
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [salary, setSalary] = useState<number>(0);

    // Migration Logic (Run once on mount)
    useEffect(() => {
        const oldExpensesStr = localStorage.getItem(OLD_EXPENSES_KEY);
        if (oldExpensesStr) {
            try {
                const oldExpenses: Expense[] = JSON.parse(oldExpensesStr);
                const oldSalaryStr = localStorage.getItem(OLD_SALARY_KEY);
                const oldSalary = oldSalaryStr ? JSON.parse(oldSalaryStr) : 0;

                // Group by month/year
                const grouped: Record<string, MonthlyData> = {};

                oldExpenses.forEach(exp => {
                    const date = new Date(exp.date);
                    const key = getStorageKey(date.getFullYear(), date.getMonth());
                    if (!grouped[key]) {
                        grouped[key] = { expenses: [], salary: oldSalary }; // Assign old salary to all months with data
                    }
                    grouped[key].expenses.push(exp);
                });

                // Save to new keys
                Object.entries(grouped).forEach(([key, data]) => {
                    localStorage.setItem(key, JSON.stringify(data));
                });

                // Clear old data
                localStorage.removeItem(OLD_EXPENSES_KEY);
                localStorage.removeItem(OLD_SALARY_KEY);
                console.log('Migration completed successfully');
            } catch (e) {
                console.error('Migration failed', e);
            }
        }
    }, []);

    // Load data when month/year changes
    useEffect(() => {
        const key = getStorageKey(selectedYear, selectedMonth);
        const stored = localStorage.getItem(key);
        if (stored) {
            const data: MonthlyData = JSON.parse(stored);
            setExpenses(data.expenses || []);
            setSalary(data.salary || 0);
        } else {
            setExpenses([]);
            setSalary(0);
        }
    }, [selectedYear, selectedMonth]);

    // Save data when expenses/salary change
    useEffect(() => {
        const key = getStorageKey(selectedYear, selectedMonth);
        const data: MonthlyData = { expenses, salary };
        localStorage.setItem(key, JSON.stringify(data));
    }, [expenses, salary, selectedYear, selectedMonth]);

    // Save currency
    useEffect(() => {
        localStorage.setItem(CURRENCY_KEY, JSON.stringify(currency));
    }, [currency]);

    const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
        const expenseDate = new Date(expenseData.date);
        const expYear = expenseDate.getFullYear();
        const expMonth = expenseDate.getMonth();

        const newExpense: Expense = {
            ...expenseData,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
        };

        if (expYear === selectedYear && expMonth === selectedMonth) {
            // If adding to current view, update state directly
            setExpenses(prev => [newExpense, ...prev]);
        } else {
            // If adding to a different month, update that storage key directly
            const key = getStorageKey(expYear, expMonth);
            const stored = localStorage.getItem(key);
            let data: MonthlyData = stored ? JSON.parse(stored) : { expenses: [], salary: 0 };
            data.expenses = [newExpense, ...data.expenses];
            localStorage.setItem(key, JSON.stringify(data));
        }
    };

    const updateExpense = (id: string, updated: Partial<Omit<Expense, 'id' | 'createdAt'>>) => {
        setExpenses(prev => prev.map(exp => exp.id === id ? { ...exp, ...updated } : exp));
    };

    const deleteExpense = (id: string) => {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
    };

    const getYearlyData = () => {
        const monthlyStats: { month: string; income: number; expenses: number; savings: number }[] = [];
        let totalIncome = 0;
        let totalExpenses = 0;
        const categoryTotals: Record<string, number> = {};

        for (let i = 0; i < 12; i++) {
            const key = getStorageKey(selectedYear, i);
            const stored = localStorage.getItem(key);
            const data: MonthlyData = stored ? JSON.parse(stored) : { expenses: [], salary: 0 };

            const monthlyExpenseTotal = data.expenses.reduce((sum, e) => sum + e.amount, 0);

            monthlyStats.push({
                month: new Date(selectedYear, i).toLocaleString('default', { month: 'short' }),
                income: data.salary,
                expenses: monthlyExpenseTotal,
                savings: data.salary - monthlyExpenseTotal
            });

            totalIncome += data.salary;
            totalExpenses += monthlyExpenseTotal;

            data.expenses.forEach(e => {
                categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
            });
        }

        return {
            monthlyStats,
            totalIncome,
            totalExpenses,
            totalSavings: totalIncome - totalExpenses,
            categoryTotals
        };
    };

    return {
        expenses,
        salary,
        currency,
        selectedMonth,
        selectedYear,
        setSalary,
        setCurrency,
        setSelectedMonth,
        setSelectedYear,
        addExpense,
        updateExpense,
        deleteExpense,
        getYearlyData
    };
};
