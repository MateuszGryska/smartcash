const initialState = {
  data: [
    {
      name: 'user1',
      password: 'haslo123',
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
          {
            name: 'second income category',
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
          {
            name: 'second expense category',
            sum: 5000,
            incomesInCategory: [],
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
