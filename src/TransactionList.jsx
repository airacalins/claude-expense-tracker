import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { CATEGORIES } from './constants'

const TransactionList = ({ transactions, onDelete }) => {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  let filtered = transactions;
  if (filterType !== "all") filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== "all") filtered = filtered.filter(t => t.category === filterCategory);

  const handleConfirmDelete = () => {
    onDelete(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div className="panel transactions">
      <div className="transactions-header">
        <h2 className="section-title">Transactions</h2>
        <div className="filter-group">
          <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                No transactions match your filters.
              </td>
            </tr>
          ) : filtered.map(t => (
            <tr key={t.id}>
              <td className="date-cell">{t.date}</td>
              <td className="description-cell">{t.description}</td>
              <td><span className="category-badge">{t.category}</span></td>
              <td className={`amount-cell ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                {t.type === "income" ? "+" : "−"}${t.amount.toLocaleString()}
              </td>
              <td className="action-cell">
                <button
                  className="delete-btn"
                  onClick={() => setPendingDeleteId(t.id)}
                  aria-label={`Delete transaction: ${t.description}`}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pendingDeleteId !== null && (
        <ConfirmDialog
          message="Are you sure you want to delete this transaction?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
    </div>
  );
}

export default TransactionList
