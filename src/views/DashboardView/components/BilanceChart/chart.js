import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import format from 'date-fns/format';
import { subDays } from 'date-fns';
import palette from '../../../../theme/palette';

// get last 7 days
const now = new Date();
const sevenDaysBefore = subDays(new Date(now), 6);
const getLastSevenDays = eachDayOfInterval({ start: sevenDaysBefore, end: now });
export const result = getLastSevenDays.map((date) => format(date, 'dd MMM'));

export const data = {
  labels: result,
  datasets: [
    {
      label: 'Expense',
      backgroundColor: palette.error.main,
      data: [18, 5, 19, 27, 29, 19],
    },
    {
      label: 'Income',
      backgroundColor: palette.success.main,
      data: [25, 23, 12, 29, 30, 25],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary,
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 15,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider,
        },
      },
    ],
  },
};
