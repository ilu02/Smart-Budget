return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to your Budget Dashboard!</h1>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Create Budget Form */}
        <div style={{ border: '1px dotted gray', padding: '1rem', borderRadius: '8px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}>
          <h2>Create Budget</h2>
          <form onSubmit={handleCreateBudget}>
            <input
              type="text"
              placeholder="Budget Name"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              required
              style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <br />
            <input
              type="number"
              placeholder="Amount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              required
              style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <br />
            <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '0.5rem 1rem' }}>
              Create Budget
            </button>
          </form>
        </div>

        {/* Add Expense Form */}
        <div style={{ border: '1px dotted gray', padding: '1rem', borderRadius: '8px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}>
          <h2>Add New Expense</h2>
          <form onSubmit={handleAddExpense}>
            <input
              type="text"
              placeholder="Expense Name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              required
              style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <br />
            <input
              type="number"
              placeholder="Amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              required
              style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <br />
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              required
              style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            >
              <option value="">Select Category</option>
              {budgets.map((b, idx) => (
                <option key={idx} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <br />
            <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '0.5rem 1rem' }}>
              Add Expense
            </button>
          </form>
        </div>
      </div>

      <h2>Existing Budgets</h2>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {budgets.map((budget, index) => (
          <div key={index} style={{ border: '1px solid gray', padding: '1rem', borderRadius: '8px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)', width: '200px' }}>
            <h3>{budget.name}</h3>
            <p>Budgeted: ${budget.amount}</p>
            <p>Spent: ${budget.spent}</p>
            <p>Remaining: ${budget.amount - budget.spent}</p>
            <progress value={budget.spent} max={budget.amount} style={{ width: '100%' }}></progress>
            <button style={{ backgroundColor: 'gray', color: 'white', padding: '0.5rem 1rem', marginTop: '1rem' }}>
              View Details
            </button>
          </div>
        ))}
      </div>

      <h2>Recent Expenses</h2>
      <div style={{ marginTop: '1rem' }}>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {expenses.map((expense, index) => (
              <li key={index} style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>
                <strong>{expense.name}</strong> - ${expense.amount.toFixed(2)}  
                <span style={{ color: 'gray', marginLeft: '0.5rem' }}>({expense.category})</span>
                <div style={{ fontSize: '0.85rem', color: '#999' }}>{expense.date}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
