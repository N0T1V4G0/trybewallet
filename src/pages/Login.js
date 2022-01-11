import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
    };
  }

  render() {
    const { emailInput, passwordInput } = this.state;
    return (
      <div>
        <form>
          <input type="email" name="emailInput" />
          <input type="password" name="passwordInput" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps)(Login);
