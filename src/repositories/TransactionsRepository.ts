import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (total: Omit<Balance, 'total'>, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            total.income += transaction.value;
            break;

          case 'outcome':
            total.outcome += transaction.value;
            break;

          default:
            break;
        }
        return total;
      },
      {
        income: 0,
        outcome: 0,
      },
    );
    // const income = this.transactions
    //   .filter(transaction => transaction.type === 'income')
    //   .reduce((total, transaction) => {
    //     return total + transaction.value;
    //   }, 0);

    // const outcome = this.transactions
    //   .filter(transaction => transaction.type === 'outcome')
    //   .reduce((total, transaction) => {
    //     return total + transaction.value;
    //   }, 0);

    const total = income - outcome;

    const balance = {
      total,
      income,
      outcome,
    };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
