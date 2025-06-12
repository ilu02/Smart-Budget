import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPieChart = ({ budgets }) => {
  const data = {
    labels: budgets.map(b => b.name),
    datasets: [
      {
        label: 'Amount Spent',
        data: budgets.map(b => b.spent),
        backgroundColor: budgets.map(b => b.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h3 style={{ textAlign: 'center' }}>Expenses by Category</h3>
      <Pie data={data} />
    </div>
  );
};

export default BudgetPieChart;
