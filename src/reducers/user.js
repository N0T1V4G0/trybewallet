// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  if (action.type === 'SET_USER_EMAIL') {
    return {
      ...state,
      email: action.payload,
    };
  }
  return state;
};

export default userReducer;
