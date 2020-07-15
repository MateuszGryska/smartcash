import parseISO from 'date-fns/parseISO';
import isSameDay from 'date-fns/isSameDay';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isAfter from 'date-fns/isAfter';
import subDays from 'date-fns/subDays';
import format from 'date-fns/format';

export const useChartData = (budgetElements, day) => {
  const now = new Date();
  const sevenDaysBefore = subDays(new Date(now), day);
  const getLastSevenDays = eachDayOfInterval({ start: sevenDaysBefore, end: now });
  const labels = getLastSevenDays.map((date) => format(date, 'dd MMM'));

  const filteredIncomes = [];
  const filteredExpenses = [];
  const readyIncomes = [];
  const readyExpenses = [];

  if (budgetElements.length > 0) {
    // filter all data to last 7 days and incomes/expenses
    budgetElements
      .filter((item) => {
        return isAfter(parseISO(item.date), sevenDaysBefore);
      })
      .forEach((item) => {
        if (item.type === 'income') {
          filteredIncomes.push(item);
        } else if (item.type === 'expense') {
          filteredExpenses.push(item);
        }
      });

    // Checks the filtered array and adds it to show the data array
    for (let i = 0; i < getLastSevenDays.length; i += 1) {
      for (let y = 0; y < filteredIncomes.length; y += 1) {
        if (isSameDay(getLastSevenDays[i], parseISO(filteredIncomes[y].date))) {
          if (!readyIncomes[i]) {
            readyIncomes.push(filteredIncomes[y].amount);
          } else {
            readyIncomes[i] += filteredIncomes[y].amount;
          }
        }
      }
      if (!readyIncomes[i]) {
        readyIncomes.push(0);
      }
    }

    for (let i = 0; i < getLastSevenDays.length; i += 1) {
      for (let y = 0; y < filteredExpenses.length; y += 1) {
        if (isSameDay(getLastSevenDays[i], parseISO(filteredExpenses[y].date))) {
          if (!readyExpenses[i]) {
            readyExpenses.push(filteredExpenses[y].amount);
          } else {
            readyExpenses[i] += filteredExpenses[y].amount;
          }
        }
      }
      if (!readyExpenses[i]) {
        readyExpenses.push(0);
      }
    }
  }
  return { readyIncomes, readyExpenses, labels };
};
