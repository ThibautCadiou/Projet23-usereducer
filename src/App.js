import { useReducer } from 'react';
import BankAccountInfos from './components/BankAccountInfos';
import Button from './components/Button';

const LOAN_AMOUNT = 1000;

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (!state.isActive & (action.type !== 'openAccount')) return state;

  switch (action.type) {
    case 'openAccount':
      return { ...state, balance: 500, isActive: true };

    case 'deposit':
      return { ...state, balance: state.balance + action.payload, isActive: true };

    case 'withdraw':
      return { ...state, balance: state.balance - action.payload, isActive: true };

    case 'requestLoan':
      if (state.loan > 0) return state;

      return { ...state, balance: state.balance + action.payload, loan: action.payload };

    case 'payLoan':
      return { ...state, loan: 0, balance: state.balance - state.loan };

    case 'closeAccount':
      if (state.loan > 0 || state.balance !== 0) return state;

      return initialState;

    default:
      throw new Error('Unknown');
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='app'>
      <header>
        <h1 className='title'>Use Reducer Bank Account</h1>
      </header>

      <main>
        <div className='bank-account-infos '>
          <BankAccountInfos text={'Balance'} value={balance} />
          <BankAccountInfos text={'Loan'} value={loan > 0 ? LOAN_AMOUNT : 0} />
        </div>

        <Button
          onClick={() => dispatch({ type: 'openAccount' })}
          otherClassnames={!isActive ? 'btn' : 'btn btn-inactive btn:inactive'}
        >
          Open Account
        </Button>
        <Button
          onClick={() => dispatch({ type: 'deposit', payload: 150 })}
          otherClassnames={isActive ? 'btn' : 'btn btn-inactive btn:inactive'}
        >
          Deposit 150€
        </Button>
        <Button
          onClick={() => dispatch({ type: 'withdraw', payload: 50 })}
          otherClassnames={isActive ? 'btn' : 'btn btn-inactive btn:inactive'}
        >
          Withdraw 50€
        </Button>
        <Button
          onClick={() => dispatch({ type: 'requestLoan', payload: LOAN_AMOUNT })}
          otherClassnames={isActive ? 'btn' : 'btn btn-inactive btn:inactive'}
        >
          Request a {LOAN_AMOUNT}€ Loan
        </Button>
        <Button
          otherClassnames={isActive ? 'btn' : 'btn btn-inactive btn:inactive'}
          onClick={() => dispatch({ type: 'payLoan' })}
        >
          Pay the Loan
        </Button>
        <Button
          onClick={() => dispatch({ type: 'closeAccount' })}
          otherClassnames={isActive ? 'btn' : 'btn btn-inactive btn:inactive'}
        >
          Close account
        </Button>
      </main>
      <footer>
        <Button otherClassnames='btn btn-reset btn:inactive'>Reset</Button>
      </footer>
    </div>
  );
}
