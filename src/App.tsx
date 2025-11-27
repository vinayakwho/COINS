import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { SalaryInput } from './components/SalaryInput';
import { ChartsContainer } from './components/ChartsContainer';
import { YearlyAnalytics } from './components/YearlyAnalytics';
import { useExpenses } from './hooks/useExpenses';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses' | 'add' | 'yearly'>('dashboard');
  const {
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
  } = useExpenses();

  const handleAddExpense = (expense: any) => {
    addExpense(expense);
    setActiveTab('expenses');
  };

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      currency={currency}
      onCurrencyChange={setCurrency}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      onMonthChange={setSelectedMonth}
      onYearChange={setSelectedYear}
    >
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <SalaryInput
            currentSalary={salary}
            onSave={setSalary}
            currency={currency}
          />
          <Dashboard
            salary={salary}
            expenses={expenses}
            currency={currency}
          />
          <ChartsContainer
            expenses={expenses}
            currency={currency}
          />
        </div>
      )}

      {activeTab === 'add' && (
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-primary-900 mb-6 font-serif">Add New Expense</h2>
          <ExpenseForm onSave={handleAddExpense} />
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-primary-900 font-serif">Expense History</h2>
          <ExpenseList
            expenses={expenses}
            onUpdate={updateExpense}
            onDelete={deleteExpense}
            currency={currency}
          />
        </div>
      )}

      {activeTab === 'yearly' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-primary-900 font-serif">Yearly Analytics ({selectedYear})</h2>
          <YearlyAnalytics
            data={getYearlyData()}
            currency={currency}
            year={selectedYear}
          />
        </div>
      )}
    </Layout>
  );
}

export default App;
