/**
 * A model that is going to represent a single 
 */
export type WalletModel = {
  /**
   * The ID of this wallet.
   */
  id: string;


  /**
   * The name of this asset.
   */
  name: string;

  /**
   * The shortcode that represents how this asset is displayed on exchanges. 
   */
  asset: string;

  /**
   * The quantity of this asset present in the wallets.
   */
  quantity: number;

  /**
   * The price this asset has (right now)?
   */
  price: number;

  /**
   * The price this asset was bought at.
   */
  boughtAt: number;

  /**
   * The owner of this asset.
   */
  owner: string;
};