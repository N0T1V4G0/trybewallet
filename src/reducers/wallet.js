// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_EXPENSE_FORM,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editModeId: -1,
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
  if (action.type === REMOVE_EXPENSE) {
    const expenses = state.expenses.filter(
      (expense) => expense.id !== action.payload,
    );
    return {
      ...state,
      expenses,
    };
  }
  if (action.type === EDIT_EXPENSE) {
    return {
      ...state,
      editModeId: action.payload,
    };
  }
  if (action.type === EDIT_EXPENSE_FORM) {
    const expenses = state.expenses.map((expense) => {
      if (expense.id === action.payload.id) {
        action.payload.exchangeRates = expense.exchangeRates;
        return action.payload;
      }
      return expense;
    });
    return {
      ...state,
      expenses,
      editModeId: -1,
    };
  }

  return state;
};

export default walletReducer;
