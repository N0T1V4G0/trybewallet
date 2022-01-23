// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  if (action.type === GET_CURRENCIES) {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  if (action.type === ADD_EXPENSE) {
    const prevExpenses = [...state.expenses];
    const newExpenses = [...prevExpenses, action.payload];
    return {
      ...state,
      expenses: newExpenses,
    };
  }
  return state;
};

export default walletReducer;
