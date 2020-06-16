import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransaction): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw Error('Type invalid');
    }

    if (type === 'outcome' && total < value) {
      throw Error('Insufficient funds');
    }

    const createTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return createTransaction;
  }
}

export default CreateTransactionService;
