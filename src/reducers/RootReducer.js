const initialState = {
  data: {
    data: 'test',
  },
};

const RootReducer = (state = initialState, action) => {
  console.log(state, action);
};

export default RootReducer;
