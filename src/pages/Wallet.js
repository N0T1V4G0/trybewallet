import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  calculateTotalExpenses = () => {
    const { expenses } = this.props;
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      const whatever = expense.value * expense.exchangeRates[expense.currency].ask;
      totalExpenses += whatever;
    });
    return totalExpenses;
  };

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">{this.calculateTotalExpenses()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <ExpensesForm />
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { userEmail: state.user.email, expenses: state.wallet.expenses }
);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Wallet);
