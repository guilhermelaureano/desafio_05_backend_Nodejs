import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type, value} : Request): Transaction {
    const {total} = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid.');
    }

    if (type === 'outcome' && total < value) {
      throw new Error('Insufficient balance.')
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value
    });
    return transaction;
  }
}

export default CreateTransactionService;
