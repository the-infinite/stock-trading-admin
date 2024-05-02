export type TransactionModel = {
  /**
   * The UID of the person that made this transaction on behalf of the company.
   */
  owner: string;

  /**
   * The UID of this transaction itself.
   */
  id: string;

  /**
   * A string constant that represents the type of this transaction.
   */
  type: string & ("buy" | "sell");

  /**
   * The price that this item was bought at.
   */
  price: number;

  /**
   * The number of units that were bought for this transaction.
   */
  quantity: number;

  /**
   * The ID of the customer that was involved with this transaction.
   */
  customer: string;

  /**
   * The asset that was involved in this transaction.
   */
  asset: string;

  /**
   * The name of the asset that was involved in this transaction.
   */
  assetName: string;

  /**
   * The time when this transaction was made.
   */
  timestamp: number;

  /**
   * The profit or loss on this transaction.
   */
  margin: number;

  /**
   * The status of this transaction.
   */
  status: string & ("profit" | "loss" | "running" | "none");
};