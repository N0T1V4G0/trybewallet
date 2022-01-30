import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getCurrenciesAction, addExpenseAction, editExpenseFormAction } from '../actions';

class ExpensesForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { addExpense } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await response.json();
    delete responseJson.USDT;
    const payload = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: responseJson,
    };
    addExpense(payload);
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    this.setState({
      value: '',
      description: '',
    });
  };

  editExpense = (e) => {
    e.preventDefault();
    const { editModeId, editExpense } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    const payload = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    editExpense(payload, editModeId);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editModeId } = this.props;
    return (
      <div>
        <form>
          <input
            type="number"
            name="value"
            id=""
            data-testid="value-input"
            placeholder="Valor"
            value={ value }
            onChange={ this.onInputChange }
          />
          <input
            type="text"
            name="description"
            id=""
            data-testid="description-input"
            placeholder="Descrição"
            value={ description }
            onChange={ this.onInputChange }
          />
          <label htmlFor="currency-input">
            <select
              name="currency"
              id="currency-input"
              value={ currency }
              onChange={ this.onInputChange }
              data-testid="currency-input"
              aria-label="moeda"
            >
              {currencies.map((currencySelect, i) => (
                <option
                  key={ i }
                  value={ currencySelect }
                  data-testid={ currencySelect }
                >
                  {currencySelect}
                </option>
              ))}
            </select>
          </label>
          <select
            name="method"
            id=""
            data-testid="method-input"
            value={ method }
            onChange={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            id=""
            data-testid="tag-input"
            value={ tag }
            onChange={ this.onInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          {editModeId >= 0 ? (
            <button type="button" onClick={ this.editExpense }>Editar despesa</button>
          ) : (
            <button type="submit" onClick={ this.handleSubmit }>
              Adicionar despesa
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editModeId: state.wallet.editModeId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getCurrencies: getCurrenciesAction,
    addExpense: addExpenseAction,
    editExpense: editExpenseFormAction,
  },
  dispatch,
);

ExpensesForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editModeId: PropTypes.number.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
