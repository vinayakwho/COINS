import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface MonthYearSelectorProps {
    selectedMonth: number;
    selectedYear: number;
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
}

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
}) => {
    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            onMonthChange(11);
            onYearChange(selectedYear - 1);
        } else {
            onMonthChange(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            onMonthChange(0);
            onYearChange(selectedYear + 1);
        } else {
            onMonthChange(selectedMonth + 1);
        }
    };

    return (
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-primary-100 shadow-sm">
            <button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-primary-50 rounded-full text-primary-600 transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 min-w-[140px] justify-center">
                <Calendar className="w-4 h-4 text-primary-400" />
                <span className="font-serif font-semibold text-primary-900">
                    {MONTHS[selectedMonth]} {selectedYear}
                </span>
            </div>

            <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-primary-50 rounded-full text-primary-600 transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};
