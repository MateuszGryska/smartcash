import subDays from 'date-fns/subDays';
import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';

export const useComparisonData = (budgetElements, categories, wallets, isLoading) => {
  // get wallets sum total value
  const walletsAllSumValues = [];
  if (wallets && !isLoading) {
    wallets.forEach((wallet) => walletsAllSumValues.push(wallet.sum));
  }
  const walletsTotal = walletsAllSumValues.reduce((w, sum) => w + sum, 0);

  // get income and expense total value
  const getLastMonthSum = (type) => {
    const lastMonth = subDays(new Date(), 30);
    const lastMonthAmountSum = budgetElements
      .filter(
        (budgetElement) =>
          isBefore(parseISO(budgetElement.date), lastMonth) && budgetElement.type === type,
      )
      .map((budgetElement) => budgetElement.amount)
      .reduce((budgetElement, sum) => budgetElement + sum, 0);

    return lastMonthAmountSum || 0;
  };

  const incomeAllSumValues = [];
  const expenseAllSumValues = [];
  if (categories && !isLoading) {
    const filteredIncomes = categories.filter((item) => {
      return item.type === 'income';
    });
    filteredIncomes.forEach((income) => incomeAllSumValues.push(income.sum));
    const filteredExpenses = categories.filter((item) => {
      return item.type === 'expense';
    });
    filteredExpenses.forEach((expense) => expenseAllSumValues.push(expense.sum));
  }

  let income;
  let expense;
  let lastMonthIncome;
  let lastMonthExpense;
  let total;
  let lastMonthTotal;

  if (budgetElements && !isLoading) {
    income = incomeAllSumValues.reduce((incomeTotal, sum) => incomeTotal + sum, 0);
    expense = expenseAllSumValues.reduce((expenseTotal, sum) => expenseTotal + sum, 0);
    lastMonthIncome =
      getLastMonthSum('income') !== 0 ? (income * 100) / getLastMonthSum('income') - 100 : 0;
    lastMonthExpense =
      getLastMonthSum('expense') !== 0 ? (expense * 100) / getLastMonthSum('expense') - 100 : 0;
    total = income - expense;
    lastMonthTotal = (total * 100) / (getLastMonthSum('income') - getLastMonthSum('expense')) - 100;
  }

  return {
    walletsTotal,
    income,
    expense,
    lastMonthIncome,
    lastMonthExpense,
    total,
    lastMonthTotal,
  };
};
