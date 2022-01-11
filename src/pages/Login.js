import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setUserEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    const { emailInput } = this.state;
    const { updateUserEmail } = this.props;
    updateUserEmail(emailInput);
  };

  hideSubmitBtn = () => {
    const { emailInput, passwordInput } = this.state;
    const MIN_PASS_LENGTH = 6;
    if (
      passwordInput.length >= MIN_PASS_LENGTH
      && emailInput.includes('@')
      && emailInput.endsWith('.com')
    ) {
      return false;
    }
    return true;
  };

  render() {
    const { emailInput, passwordInput } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            name="emailInput"
            data-testid="email-input"
            onChange={ this.handleInputChange }
            value={ emailInput }
          />
          <input
            type="password"
            name="passwordInput"
            data-testid="password-input"
            onChange={ this.handleInputChange }
            value={ passwordInput }
          />
          <Link to="/carteira">
            <button
              type="submit"
              onClick={ this.handleSubmit }
              disabled={ this.hideSubmitBtn() }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    updateUserEmail: setUserEmail,
  },
  dispatch,
);

Login.propTypes = {
  updateUserEmail: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
