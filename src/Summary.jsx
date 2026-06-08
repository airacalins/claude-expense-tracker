import { useMemo } from 'react'

const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 0 });

const Summary = ({ transactions }) => {
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  }, [transactions]);

  return (
    <div className="summary">
      <div className="summary-card income">
        <p className="summary-label">Total Income</p>
        <p className="income-amount">${fmt(totalIncome)}</p>
      </div>
      <div className="summary-card expense">
        <p className="summary-label">Total Expenses</p>
        <p className="expense-amount">${fmt(totalExpenses)}</p>
      </div>
      <div className="summary-card balance">
        <p className="summary-label">Net Balance</p>
        <p className="balance-amount">{balance >= 0 ? '+' : '−'}${fmt(Math.abs(balance))}</p>
      </div>
    </div>
  );
}

export default Summary
