import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeExpenseAction } from '../actions';

class ExpensesTable extends Component {
  render() {
    const { expenses, removeExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>
                {expense.exchangeRates[expense.currency].name.split('/')[0]}
              </td>
              <td>
                {(expense.exchangeRates[expense.currency].ask * 1).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                {expense.value * expense.exchangeRates[expense.currency].ask}
              </td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => removeExpense(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    removeExpense: removeExpenseAction,
  },
  dispatch,
);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
