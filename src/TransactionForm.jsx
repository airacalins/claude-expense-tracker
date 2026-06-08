import { useState } from 'react'
import { CATEGORIES } from './constants'

const TransactionForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!description.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      description,
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="panel add-transaction">
      <h2 className="section-title">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label" htmlFor="description">Description</label>
            <input
              id="description"
              className="form-input"
              type="text"
              placeholder="e.g. Grocery run"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="amount">Amount</label>
            <input
              id="amount"
              className="form-input"
              type="number"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="type">Type</label>
            <select id="type" className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="category">Category</label>
            <select id="category" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          <button className="btn-primary" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm
