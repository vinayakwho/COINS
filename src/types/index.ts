export interface Expense {
    id: string;
    date: string; // ISO string
    category: string;
    amount: number;
    remarks: string;
    createdAt: number;
}

export interface MonthlySalary {
    amount: number;
    month: string;
}

export const CATEGORIES = [
    "Saving",
    "Housing",
    "Insurance",
    "Food",
    "Transport",
    "Utilities",
    "Medical",
    "Education",
    "Entertainment",
    "Others"
] as const;

export type Category = typeof CATEGORIES[number];

export interface Currency {
    code: string;
    symbol: string;
    name: string;
}

export const CURRENCIES: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];
