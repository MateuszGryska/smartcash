const initialState = {
  data: [
    {
      name: 'user1',
      password: '',
      firstName: 'Matthew',
      lastName: 'Example',
      wallets: [
        {
          name: 'My account',
          value: 3000,
        },
      ],
      allCategory: {
        incomes: [
          {
            name: 'first income category',
            sum: 5000,
            incomesInCategory: [],
          },
        ],
        expenses: [
          {
            name: 'first expense category',
            sum: 4000,
            expensesInCategory: [],
          },
        ],
      },
    },
  ],
};

const RootReducer = (state = initialState, action) => {
  console.log(state, action);
};

export default RootReducer;
