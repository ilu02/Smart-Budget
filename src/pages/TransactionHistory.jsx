import React, { useState, useEffect } from 'react';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  
  // Sample data
  useEffect(() => {
    const sampleTransactions = [
      { id: 1, date: '2025-04-20', category: 'Groceries', amount: 50.0 },
      { id: 2, date: '2025-04-21', category: 'Entertainment', amount: 20.0 },
      { id: 3, date: '2025-04-22', category: 'Transport', amount: 15.0 },
      // Add more sample transactions as needed
    ];
    setTransactions(sampleTransactions);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Transaction History</h2>
      <div>
        <input
          type="date"
          placeholder="Filter by date"
          // Add filtering functionality if needed
        />
        <button>Filter</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'transparent' }}>
              <td style={{ padding: '12px' }}>{transaction.date}</td>
              <td style={{ padding: '12px' }}>{transaction.category}</td>
              <td style={{ padding: '12px' }}>${transaction.amount.toFixed(2)}</td>
              <td style={{ padding: '12px' }}>
                <button style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                  onClick={() => {
                    // Delete functionality can be added later
                    alert('Delete functionality not implemented yet.');
                  }}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
