import { useState, useCallback } from 'react'
import './App.css'
import Summary from './Summary'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import SpendingChart from './SpendingChart'

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const App = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2026-06-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2026-06-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2026-06-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2026-06-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2026-06-05" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2026-06-06" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2026-06-07" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2026-06-07" },
  ]);

  const handleAdd = useCallback((transaction) => {
    setTransactions(prev => [...prev, transaction]);
  }, []);

  const handleDelete = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-mark">FT</div>
          <div className="app-title-group">
            <h1>Finance Tracker</h1>
            <p className="subtitle">Personal ledger</p>
          </div>
        </div>
        <div className="app-date">{today}</div>
      </header>

      <Summary transactions={transactions} />
      <TransactionForm onAdd={handleAdd} />
      <SpendingChart transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}

export default App
