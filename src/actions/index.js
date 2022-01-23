// Coloque aqui suas actions
export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export const setUserEmail = (payload) => ({
  type: SET_USER_EMAIL,
  payload,
});

export const GET_CURRENCIES = 'GET_CURRENCIES';

export const getCurrenciesAction = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseJson = await response.json();
  const currencies = Object.keys(responseJson).filter(
    (currency) => currency !== 'USDT',
  );

  return {
    type: GET_CURRENCIES,
    payload: currencies,
  };
};

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});
