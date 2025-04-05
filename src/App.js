import { useEffect, useReducer } from 'react';
import BankAccountInfos from './components/BankAccountInfos';
import Button from './components/Button';

const LOAN_AMOUNT = 1000;

export default function App() {
  const initialState = {
    balance: 100,
    hasLoan: false,
    isAccountOpen: false,
    status: 'closed', //closed, error, active, withLoan,
  };

  useEffect(function () {
    dispatch({ type: 'active' });
  }, []);

  const [{ balance, hasLoan, isAccountOpen, status }, dispatch] = useReducer(reducer, initialState);

  const createAccount = function () {
    dispatch({ type: 'active' });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'active':
        console.log('Count is active');
        return { ...state, payload: initialState, status: 'active', isAccountOpen: true };

      case 'reset':
        console.log('Everything is reset now');
        return {
          ...state,
          payload: initialState,
          balance: 0,
          status: 'closed',
          isAccountOpen: false,
        };

      default:
        console.log('the action.type properties is set to a value not known by the system ...');
    }
  }

  return (
    <div className='app'>
      <header>
        <h1 className='title'>Use Reducer Bank Account</h1>
      </header>

      <main>
        <div className='bank-account-infos '>
          <BankAccountInfos text={'Balance'} value={balance} />
          <BankAccountInfos text={'Loan'} value={hasLoan ? LOAN_AMOUNT : 0} />
        </div>

        <Button onClick={createAccount}>Open Account</Button>
        <Button otherClassnames={isAccountOpen ? 'btn' : 'btn btn-inactive btn:inactive'}>
          Deposit 150€
        </Button>
        <Button otherClassnames={isAccountOpen ? 'btn' : 'btn btn-inactive btn:inactive'}>
          Withdraw 50€
        </Button>
        <Button otherClassnames={isAccountOpen ? 'btn' : 'btn btn-inactive btn:inactive'}>
          Request a 100€ Loan
        </Button>
        <Button otherClassnames={isAccountOpen ? 'btn' : 'btn btn-inactive btn:inactive'}>
          Pay the Loan
        </Button>
        <Button otherClassnames={isAccountOpen ? 'btn' : 'btn btn-inactive btn:inactive'}>
          Close account
        </Button>
      </main>
      <footer>
        <Button otherClassnames='btn btn-reset btn:inactive' onClick={reset}>
          Reset
        </Button>
      </footer>
    </div>
  );
}
