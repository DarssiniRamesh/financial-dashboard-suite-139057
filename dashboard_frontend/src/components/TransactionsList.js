import React from 'react';
import { fmtCurrency } from '../data';

/**
 * PUBLIC_INTERFACE
 * TransactionsList
 * Renders recent transactions with type, counterparty, category, date and amount.
 */
export default function TransactionsList({ transactions = [] }) {
  /** Render transaction list with subtle separators and tags. */
  return (
    <section className="panel">
      <div className="panel__head">
        <h3 className="panel__title">Recent Transactions</h3>
      </div>
      <div className="panel__body">
        <ul className="tx">
          {transactions.map(tx => {
            const amt = tx.amount;
            const isPos = amt >= 0;
            return (
              <li className="tx__row" key={tx.id}>
                <div className="tx__main">
                  <div className="tx__top">
                    <span className={`tx__type ${tx.type}`}>{tx.type}</span>
                    <span className={`tx__status ${tx.status}`}>{tx.status}</span>
                  </div>
                  <div className="tx__sub">
                    <span className="tx__cp">{tx.counterparty}</span>
                    <span className="tx__cat">{tx.category}</span>
                    <span className="tx__date">{tx.date}</span>
                    {tx.notes ? <span className="tx__notes">• {tx.notes}</span> : null}
                  </div>
                </div>
                <div className={`tx__amount ${isPos ? 'pos' : 'neg'}`}>
                  {fmtCurrency(Math.abs(amt))}{isPos ? '' : ''}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
