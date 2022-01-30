// Coloque aqui suas actions
export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export const setUserEmail = (payload) => ({
  type: SET_USER_EMAIL,
  payload,
});

export const GET_CURRENCIES = 'GET_CURRENCIES';

export const getCurrenciesAction = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseJson = await response.json();
  const currencies = Object.keys(responseJson).filter(
    (currency) => currency !== 'USDT',
  );
  dispatch({
    type: GET_CURRENCIES,
    payload: currencies,
  });
};

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const REMOVE_EXPENSE = 'REMOVE-EXPENSE';

export const removeExpenseAction = (id) => ({
  type: REMOVE_EXPENSE,
  payload: id,
});

export const EDIT_EXPENSE = 'EDIT-EXPENSE';

export const editExpenseAction = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

// Carlos Dal Soler me ajudou na contrução do requisito 9.
export const EDIT_EXPENSE_FORM = 'EDIT_EXPENSE_FORM';
export const editExpenseFormAction = (payload, id) => {
  payload.id = id;
  return {
    type: EDIT_EXPENSE_FORM,
    payload,
  };
};
